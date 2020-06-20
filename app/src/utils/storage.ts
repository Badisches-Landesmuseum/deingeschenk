/**
 * This module provides a thin wrapper over localStorage which handles
 * serialisation/deserialisation and allows a basic work-around for non-behaving
 * browers
 */

// Apparently, when Safari is in Private Browsing Mode it looks like it supports
// localStorage but then throws an error when you try to use setItem. To get
// around this we just stick things in an in-process object when we get errors.
//
// In our case this is much better than risking an exception on some crucial
// code path.


const store: { [index: string]: string } = {};

let keyPrefix = '';


export function setPrefix(newPrefix: string): void {
  keyPrefix = newPrefix;
}

/**
 * Local storage methods
 */
export function setLocalItem(key: string, value: {}): void {
  const serialisedValue = JSON.stringify(value);
  const pkey = prefix(key);

  try {
    localStorage.setItem(pkey, serialisedValue);
  } catch (e) {
    store[pkey] = serialisedValue;
  }
}


export function getLocalItem<T = any>(key: string): T | undefined {
  let item: string | null;
  const pkey = prefix(key);

  try {
    item = localStorage.getItem(pkey) || store[pkey] || null;
  } catch (e) {
    item = store[pkey] || null;
  }

  if (item === null) return undefined;
  return JSON.parse(item) as T;
}


export function removeLocalItem(key: string): void {
  const pkey = prefix(key);

  try {
    delete store[pkey];
    localStorage.removeItem(pkey);
  } catch (e) {
    // meh
  }
}

/**
 * Session storage methods
 */
export function setSessionItem(key: string, value: {}): void {
  const serialisedValue = JSON.stringify(value);
  const pkey = prefix(key);

  try {
    sessionStorage.setItem(pkey, serialisedValue);
  } catch (e) {
    store[pkey] = serialisedValue;
  }
}


export function getSessionItem<T = any>(key: string): T | undefined {
  let item: string | null;
  const pkey = prefix(key);

  try {
    item = sessionStorage.getItem(pkey) || store[pkey] || null;
  } catch (e) {
    item = store[pkey] || null;
  }

  if (item === null) return undefined;
  return JSON.parse(item) as T;
}


export function removeSessionlItem(key: string): void {
  const pkey = prefix(key);

  try {
    delete store[pkey];
    sessionStorage.removeItem(pkey);
  } catch (e) {
    // meh
  }
}

// Apply the global prefix to create a new key
const prefix = (key: string) => keyPrefix + ':' + key;
