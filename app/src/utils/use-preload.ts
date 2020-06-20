import { useEffect, useReducer } from 'react';
import { getLogger } from './logging';
import { assertNever } from './helpers';


const logger = getLogger('use-preload');


/**
 * PreloadState represents the current download progress of multiple urls.
 *
 * The download progress for any given url is always represented as a number in
 * the range [0, 1].
 *
 * urlProgress: A map from urls to their respective download progress. This will
 *              always contain a key/value for every url.
 *
 * urlData: A map from urls to their `ObjectURL` for use as a source. This will
 *          contain a key/value for every url IFF `status === 'done'`.
 */
export interface PreloadState {
  status: 'running' | 'done' | 'error';
  urlProgress: Map<string, number>;
  urlData: Map<string, string>;
}


type PreloadAction =
  | { kind: 'url-progress', url: string, progress: number }
  | { kind: 'url-done', url: string, objectUrl: string }
  | { kind: 'url-error', url: string }
  | { kind: 'reset', urls: string[] }
;


/**
 * Create a fresh new PreloadState based on the provided urls.
 */
function mkPreloadState(urls: string[]): PreloadState {
  const urlProgressMap = new Map<string, number>();
  urls.forEach((url) => urlProgressMap.set(url, 0));

  return {
    status: (urls.length === 0) ? 'done' : 'running',
    urlProgress: urlProgressMap,
    urlData: new Map<string, string>(),
  };
}


function preloadReducer(state: PreloadState, action: PreloadAction): PreloadState {
  logger.debug('PreloadAction', state, action);

  if (action.kind === 'reset') return mkPreloadState(action.urls);

  if (action.kind === 'url-progress') {
    return { ...state, urlProgress: state.urlProgress.set(action.url, action.progress) };
  }

  if (action.kind === 'url-done') {
    let allDone = true;

    state.urlProgress.forEach((progress, url) => {
      if (url === action.url) return;
      if (progress < 1) allDone = false;
    });

    const status = (state.status === 'running' && allDone) ? 'done' : state.status;

    return {
      ...state,
      status,
      urlProgress: state.urlProgress.set(action.url, 1),
      urlData: state.urlData.set(action.url, action.objectUrl),
    };
  }

  if (action.kind === 'url-error') {
    return { ...state, status: 'error' };
  }

  return assertNever(action);
}


/**
 * [React Hook] Given a collection of urls, this hook will run an effect which
 * downloads the given urls and provides the current progress via a
 * `PreloadState`.
 *
 * A new download effect will occur if the given `urls` change.
 *
 * NOTE: We don't implement any caching ourselves, preferring to rely on
 * appropriate cache headers in the responses and the browser's native caching
 * mechanisms.
 *
 * TODO: Consider if it's worth offloading request-handling to a web-worker
 * TODO: Consider redirect handling
 * TODO: Consider timeout and retry handling
 * TODO: Write some docs about caching / dependencyKey / cleanup / revokeObjectURL
 */
export function usePreload(urls: string[]): [PreloadState] {
  const [state, dispatch] = useReducer(preloadReducer, urls, mkPreloadState);

  // Web requests are expensive, so we only want to run when urls have actually
  // changed. Passing this to useEffect will ensure that's the case.
  const dependencyKey = JSON.stringify(urls.sort());

  useEffect(() => {
    dispatch({ kind: 'reset', urls });

    const createdObjectUrls: string[] = [];
    const runningRequests: Set<XMLHttpRequest> = new Set();

    urls.forEach((url) => {
      const req = new XMLHttpRequest();

      req.onprogress = (progressEvent) => {
        const progress = progressEvent.lengthComputable
          ? progressEvent.loaded / progressEvent.total
          : 0;

        dispatch({ kind: 'url-progress', url, progress });
      };

      req.onload = () => {
        try {
          if (req.status !== 200) throw new Error();
          const objectUrl = URL.createObjectURL(req.response);
          createdObjectUrls.push(objectUrl);
          dispatch({ kind: 'url-done', url, objectUrl });
        } catch {
          dispatch({ kind: 'url-error', url });
        }
      };

      req.onerror = () => dispatch({ kind: 'url-error', url });

      req.onloadend = () => runningRequests.delete(req);

      req.open('GET', url, true);
      req.responseType = 'blob';
      req.send();
      runningRequests.add(req);
    });

    // Cleanup function called when dependencyKey changes. Here we abort any
    // outstanding requests and revoke any object-urls we created.
    return () => {
      runningRequests.forEach((req) => {
        try { req.abort(); } catch {}
      });
      createdObjectUrls.forEach((objectUrl) => {
        try { URL.revokeObjectURL(objectUrl); } catch {}
      });
    };
  }, [dependencyKey]);

  return [state];
}


/**
 * Determine the overall progress of a preload. Progress is represented as a
 * number in the range [0,1]
 *
 * NOTE: For now this assumes each file being preloaded is the same size.
 * TODO: Track the total size of each file for more accurate progress reporting.
 */
export function totalProgress(state: PreloadState): number {
  const urlCount = state.urlProgress.size;
  if (urlCount === 0) return 1;

  let summedProgress = 0;
  state.urlProgress.forEach((progress) => summedProgress += progress);

  return summedProgress / urlCount;
}
