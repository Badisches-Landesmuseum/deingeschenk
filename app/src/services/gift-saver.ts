import { useEffect, useReducer, useState } from 'react';
import { getLogger } from '../utils/logging';
import { assertNever } from '../utils/helpers';

import { InProgressGift, LocalFile } from '../domain';
import {
  CreatePreparedUploadResponse,
  CreateGiftRequest,
  CreateGiftResponse,
} from '../common/api-schema';

import { api } from './index';
import { AssetUploader } from './asset-uploader';
import { ApiError } from './api';

const logger = getLogger('use-gift-saver');


/**
 * Exposed interface for useGiftSaver
 */
export type GiftSaver =
  | { kind: 'invalid-gift', abort: () => void }
  | { kind: 'uploading-assets', progress: number, abort: () => void }
  | { kind: 'uploading-assets-error', abort: () => void, retry: () => void }
  | { kind: 'saving-gift', abort: () => void }
  | { kind: 'saving-gift-error', error: ApiError, abort: () => void, retry: () => void }
  | { kind: 'done', gift: Gift, abort: () => void }
;


// Helpful, shorter aliases for API types
type PreparedUpload = CreatePreparedUploadResponse;
type GiftData = CreateGiftRequest;
type Gift = CreateGiftResponse;


type AssetUploadState =
  | { kind: 'running', uploader: AssetUploader, progress: number }
  | { kind: 'failure' }
  | { kind: 'success', upload: PreparedUpload }
;

type State =
  | { kind: 'invalid-gift' }
  | { kind: 'ready', localAssets: LocalFile[] }
  | { kind: 'uploading-assets-running', pendingUploads: Map<LocalFile, AssetUploadState> }
  | { kind: 'uploading-assets-failure', pendingUploads: Map<LocalFile, AssetUploadState> }
  | { kind: 'uploading-assets-success', uploads: Map<LocalFile, PreparedUpload> }
  | { kind: 'saving-gift-running', giftData: GiftData }
  | { kind: 'saving-gift-failure', giftData: GiftData, error: ApiError }
  | { kind: 'saving-gift-success', gift: Gift }
;

type Action =
  | { kind: 'asset-uploads-started', pendingUploads: Map<LocalFile, AssetUploadState> }
  | { kind: 'upload-progress', file: LocalFile, progress: number }
  | { kind: 'upload-done', file: LocalFile, upload: PreparedUpload }
  | { kind: 'upload-error', file: LocalFile }
  | { kind: 'gift-saving-started', giftData: GiftData }
  | { kind: 'gift-saving-done', gift: Gift }
  | { kind: 'gift-saving-error', error: ApiError }
;


/**
 * Create a fresh State based on the provided gift.
 */
function mkState(gift: InProgressGift): State {
  // TODO: Validate gift structure
  // if (!isValidGift(gift)) {
  //   return { kind: 'invalid-gift' };
  // }

  // Extract the assets we need to upload from the gift
  const localAssets: LocalFile[] = [];
  gift.parts.forEach((part) => {
    localAssets.push(part.photo);
    localAssets.push(part.note);
  });

  return { kind: 'ready', localAssets };
}



function reducer(state: State, action: Action): State {
  logger.debug('Action', state, action);

  if (action.kind === 'asset-uploads-started') {
    return { kind: 'uploading-assets-running', pendingUploads: action.pendingUploads };
  }


  if (action.kind === 'upload-progress') {
    if (state.kind !== 'uploading-assets-running') return state;

    const currentUploadState = state.pendingUploads.get(action.file);
    if (!currentUploadState || currentUploadState.kind !== 'running') return state;

    state.pendingUploads.set(action.file, { ...currentUploadState, progress: action.progress });
    return { ...state };
  }

  // In the case of a successful upload, we mark that upload as successful and
  // check whether all uploads have now completed successfully. If so we
  // transition to the uploading-assets-success state. If not we remain in the
  // current state (either 'uploading-assets-running' or
  // 'uploading-assets-failure').
  if (action.kind === 'upload-done') {
    if (state.kind !== 'uploading-assets-running' && state.kind !== 'uploading-assets-failure') {
      return state;
    }

    state.pendingUploads.set(action.file, { kind: 'success', upload: action.upload });

    const completeUploads = new Map<LocalFile, PreparedUpload>();
    state.pendingUploads.forEach((pendingUploads, file) => {
      if (pendingUploads.kind === 'success') {
        completeUploads.set(file, pendingUploads.upload);
      }
    });

    if (completeUploads.size === state.pendingUploads.size) {
      return { kind: 'uploading-assets-success', uploads: completeUploads };
    }

    return { ...state };
  }

  // In the case of an error for a single asset, we mark the state as failed --
  // but allow running uploads to continue.
  if (action.kind === 'upload-error') {
    if (state.kind !== 'uploading-assets-running' && state.kind !== 'uploading-assets-failure') {
      return state;
    }

    state.pendingUploads.set(action.file, { kind: 'failure' });
    return { ...state, kind: 'uploading-assets-failure' };
  }

  // Handle actions corresponding to posting the new gift to the API
  if (action.kind === 'gift-saving-started') {
    return { kind: 'saving-gift-running', giftData: action.giftData };
  }
  if (action.kind === 'gift-saving-done') {
    return { kind: 'saving-gift-success', gift: action.gift };
  }
  if (action.kind === 'gift-saving-error') {
    if (state.kind !== 'saving-gift-running') return state;
    return { ...state, kind: 'saving-gift-failure', error: action.error };
  }

  return assertNever(action);
}



/**
 * TODO: This info
 * TODO: Factor out into functions
 */
export function useGiftSaver(gift: InProgressGift): GiftSaver {
  const [command, setCommand] = useState<null | 'abort' | 'retry'>(null);
  const [state, dispatch] = useReducer(reducer, gift, mkState);

  useEffect(() => {
    // Attempt to upload assets when initial gift is ready
    if (state.kind === 'ready') {
      const pendingUploads = new Map<LocalFile, AssetUploadState>();

      state.localAssets.forEach((file) => {
        const uploader = new AssetUploader({
          file,
          onProgress: (progress) => dispatch({ kind: 'upload-progress', file, progress }),
          onComplete: (upload) => dispatch({ kind: 'upload-done', file, upload }),
          onError: (err) => {
            logger.error(err, 'AssetUploadError');
            dispatch({ kind: 'upload-error', file });
          },
        });
        uploader.run();
        pendingUploads.set(file, { kind: 'running', uploader, progress: 0 });
      });
      dispatch({ kind: 'asset-uploads-started', pendingUploads });
    }

    // Attempt to save the gift when assets are complete
    if (state.kind === 'uploading-assets-success') {
      // Substitute the uploaded asset files into our gift data for posting
      const giftData: GiftData = {
        id: gift.id,
        museumId: gift.museumId,
        recipientName: gift.recipientName!,
        senderName: gift.senderName!,
        parts: gift.parts.map((part) => ({
          photo: state.uploads.get(part.photo)!.fileName,
          note: state.uploads.get(part.note)!.fileName,
          clue: part.clue,
        })),
      };

      api.createGift(giftData).then((apiResult) => {
        if (apiResult.kind === 'ok') {
          dispatch({ kind: 'gift-saving-done', gift: apiResult.data });
        } else {
          dispatch({ kind: 'gift-saving-error', error: apiResult });
        }
      });
      dispatch({ kind: 'gift-saving-started', giftData });
    }

  }, [state.kind]);


  // Handle commands being called
  useEffect(() => {
    if (command === 'abort') {
      // At the moment we can only really abort properly when uploading assets
      if (state.kind === 'uploading-assets-running' || state.kind === 'uploading-assets-failure') {
        state.pendingUploads.forEach((uploadState) => {
          if (uploadState.kind === 'running') uploadState.uploader.abort();
        });
      }
    }


    if (command === 'retry') {

      // Retry asset-upload
      if (state.kind === 'uploading-assets-failure') {
        const pendingUploads = state.pendingUploads;

        pendingUploads.forEach((uploadState, file) => {
          // Ignore any uploads that are already complete
          if (uploadState.kind === 'success') return;
          if (uploadState.kind === 'running') uploadState.uploader.abort();

          // Replace the previous uploader with a new one
          const uploader = new AssetUploader({
            file,
            onProgress: (progress) => dispatch({ kind: 'upload-progress', file, progress }),
            onComplete: (upload) => dispatch({ kind: 'upload-done', file, upload }),
            onError: (err) => {
              logger.error(err, 'AssetUploadError');
              dispatch({ kind: 'upload-error', file });
            },
          });
          uploader.run();
          pendingUploads.set(file, { kind: 'running', uploader, progress: 0 });
        });
        dispatch({ kind: 'asset-uploads-started', pendingUploads });
      }


      // Retry gift-saving to API
      if (state.kind === 'saving-gift-failure') {
        const giftData = state.giftData;
        api.createGift(giftData).then((apiResult) => {
          if (apiResult.kind === 'ok') {
            dispatch({ kind: 'gift-saving-done', gift: apiResult.data });
          } else {
            dispatch({ kind: 'gift-saving-error', error: apiResult });
          }
        });
        dispatch({ kind: 'gift-saving-started', giftData });
      }

      setCommand(null);
    }
  }, [command, state.kind]);

  // Commands that may be exposed
  const abort = () => setCommand('abort');
  const retry = () => setCommand('retry');

  // Derive the exposed GiftSaver from our internal state.
  if (state.kind === 'invalid-gift') {
    return { kind: 'invalid-gift', abort };
  }
  if (state.kind === 'ready') {
    return { kind: 'uploading-assets', progress: 0, abort };
  }
  if (state.kind === 'uploading-assets-running') {
    return { kind: 'uploading-assets', progress: totalProgress(state.pendingUploads), abort };
  }
  if (state.kind === 'uploading-assets-success') {
    return { kind: 'uploading-assets', progress: 100, abort };
  }
  if (state.kind === 'uploading-assets-failure') {
    return { kind: 'uploading-assets-error', abort, retry };
  }
  if (state.kind === 'saving-gift-running') {
    return { kind: 'saving-gift', abort };
  }
  if (state.kind === 'saving-gift-success') {
    return { kind: 'done', gift: state.gift, abort };
  }
  if (state.kind === 'saving-gift-failure') {
    return { kind: 'saving-gift-error', error: state.error, abort, retry };
  }

  return assertNever(state);
}


/**
 * Determine the overall progress of uploading assets. Progress is represented
 * as a number in the range [0,1]
 *
 * NOTE: For now this assumes each file being uploaded is the same size.
 * TODO: Track the total size of each file for more accurate progress reporting.
 */
function totalProgress(pendingUploads: Map<LocalFile, AssetUploadState>): number {
  const count = pendingUploads.size;
  if (count === 0) return 1;

  let summedProgress = 0;
  pendingUploads.forEach((uploadState) => {
    const progress
      = (uploadState.kind === 'success') ? 1
      : (uploadState.kind === 'failure') ? 0
      : uploadState.progress;

    summedProgress += progress;
  });

  return summedProgress / count;
}
