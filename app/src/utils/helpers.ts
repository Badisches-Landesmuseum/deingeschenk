/**
 * Simple Typescript helper to ensure we haven't accidentally missed possible
 * cases while doing switch statements / fall-through if statements etc.
 */
export function assertNever(x: never): never {
  throw new Error(`Unexpected object: ${x}`);
}

/***
 * Detects if this is an iOS device
 * Returns true or false
 */
export function isIosDevice(): boolean {

  const iDevices = [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod',
  ];

  if (!!navigator.platform) {
    while (iDevices.length) {
      if (navigator.platform === iDevices.pop()) { return true; }
    }
  }

  return false;
}


/***
 * Returns if this is an iOS device using Chrome
 */
export function isIosDeviceUsingChrome(): boolean {
  // CriOS is unique to Chrome on Safari
  return !!navigator.userAgent.match('CriOS');
}

/***
 * Returns is this is a mobile device
 */
export function isMobileDevice(): boolean {
  /* tslint:disable-next-line max-line-length */
  return !!(/Android|webOS|iPhone|iPad|iPod|BB10|BlackBerry|IEMobile|Opera Mini|Mobile|mobile/i.test(navigator.userAgent || ''));
}


/**
 * Parse query params and return as an object
 */
export const getQueryParams = () => window.location.search
  .slice(1)
  .split('&')
  .map((s) => s.trim())
  .reduce(
    (params, val) => {
      try {
        const [k, v] = val.split('=', 2).map(decodeURIComponent);
        if (k !== '') params[k] = v;
      } catch {}
      return params;
    },
    {} as QueryParams,
  );

export type QueryParams = Partial<{ [index: string]: string | undefined }>;
