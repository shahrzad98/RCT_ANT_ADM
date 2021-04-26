import takeRight from 'lodash/takeRight';

import { LocalStorageExpiration } from '../../features/constants';
import { fromJson, toJson } from './ObjectConverters';

/*  removeStorage: removes a key from localStorage and its sibling expiracy key
    params:
        key <string>     : localStorage key to remove
    returns:
        <boolean> : telling if operation succeeded
 */
export function removeStorage(key: string) {
  try {
    localStorage.removeItem(key);
    localStorage.removeItem(key + '_expiresIn');
  } catch (e) {
    console.log(`removeStorage: Error removing key ["${key}"] from localStorage: ${JSON.stringify(e)}`);
    return false;
  }
  return true;
}

/*  getStorage: retrieves a key from localStorage previously set with setStorage().
    params:
        key <string> : localStorage key
    returns:
        <string> : value of localStorage key
        null : in case of expired key or failure
 */
export function getStorage(key: string) {
  const now = Date.now(); //epoch time, lets deal only with integer
  // set expiration for storage
  let expiresIn: string | null | number = localStorage.getItem(key + '_expiresIn');
  if (!expiresIn || isNaN(+expiresIn)) {
    expiresIn = 0;
  }

  expiresIn = Math.abs(+expiresIn);
  if (expiresIn < now) {
    // Expired
    removeStorage(key);
    return null;
  } else {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.log(`getStorage: Error reading key ['${key}'] from localStorage: ${JSON.stringify(e)}`);
      return null;
    }
  }
}

/*  setStorage: writes a key into localStorage setting a expire time
    params:
        key <string>     : localStorage key
        value <string>   : localStorage value
        expires <number> : number of seconds from now to expire the key
    returns:
        <boolean> : telling if operation succeeded
 */
export function setStorage(key: string, value: string, expires: number = LocalStorageExpiration.Infinite) {
  const now = Date.now(); //milliseconds since epoch time, lets deal only with integer
  const schedule = now + expires * 1000;
  try {
    localStorage.setItem(key, value);
    localStorage.setItem(key + '_expiresIn', schedule.toString());
  } catch (e) {
    console.log(`setStorage: Error setting key ['${key}] in localStorage: ${JSON.stringify(e)}`);
    return false;
  }
  return true;
}

export const getJsonStorage = (key: string) => {
  const storage = getStorage(key);
  if (storage) {
    return fromJson(storage);
  }
};

export const setJsonStorage = (key: string, value: any, expires: number = LocalStorageExpiration.Infinite) => {
  if (value) {
    setStorage(key, toJson(value)!, expires);
  }
};

export const addOrSetArrayStorage = (key: string, item: any, maxLength: number, expires: number = LocalStorageExpiration.Infinite) => {
  const arrayJson = getStorage(key);

  let array: any[] = [];
  if (arrayJson) {
    array = fromJson(arrayJson) as any[];
    if (array.length >= maxLength) {
      array = takeRight(array, maxLength - 1);
    }
  }
  array.push(item);

  setStorage(key, toJson(array)!, expires);
};

export function getJsonStorageWithConditions<T>(key: string, conditionFn: (obj: T) => boolean): T | undefined {
  const storage = getStorage(key);
  if (storage) {
    const obj = fromJson(storage);
    if (obj && conditionFn((obj as unknown) as T)) {
      return (obj as unknown) as T;
    }
  }
}
