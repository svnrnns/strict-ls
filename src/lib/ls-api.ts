import { LocalStorageCheckError, LocalStorageError } from './ls-error';
import { parseIfJSON, isObject, isDateString } from './helpers';
import { GenericItem } from './types';

function checkEmptyKey(key: string) {
  if (key.length === 0) throw new LocalStorageError('Key value not provided.');
}

/**
 * Retrieves the value assigned to the given key from the local storage.
 * @param {string} key - The key to look for.
 * @throws {LocalStorageCheckError} Throws an error if the key does not exist in the storage.
 * @returns {GenericItem} The value. Automatically deserializes JSON objects, Dates, numbers, and booleans.
 */
export function useGetStorage(key: string): GenericItem {
  checkEmptyKey(key);

  const item = localStorage.getItem(key);
  if (item === null) throw new LocalStorageCheckError(key);

  if (!isNaN(Number(item))) {
    return Number(item);
  }

  if (item === 'true' || item === 'false') {
    return item === 'true';
  }

  if (isDateString(item.replace(/"/g, ''))) {
    return new Date(item.replace(/"/g, ''));
  }

  return parseIfJSON(item);
}

/**
 * Sets a value to a key in the local storage. Serializes the data if the value is an object, date, number, or boolean.
 * @param {string} key - The key.
 * @param {GenericItem} value - The value.
 * @throws {LocalStorageError} Throws an error if the key is not provided.
 */
export function useSetStorage(key: string, value: GenericItem): boolean {
  checkEmptyKey(key);

  let formattedValue: string = '';

  if (value instanceof Date) {
    formattedValue = value.toISOString();
  }

  if (isObject(value) || Array.isArray(value)) {
    formattedValue = JSON.stringify(value);
  }

  if (
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    typeof value === 'string'
  ) {
    formattedValue = value.toString();
  }

  localStorage.setItem(key, formattedValue);
  return true;
}

/**
 * Checks whether a key exists or not in the local storage.
 * @param {string} key - The key to check if exists
 * @returns True if exists, false if not
 */
export function useExistsStorage(key: string): boolean {
  checkEmptyKey(key);
  return localStorage.getItem(key) !== null;
}

/**
 * Removes a key and its value from the local storage.
 * @param {*} key - The key.
 */
export function useRemoveKeyStorage(key: string) {
  checkEmptyKey(key);
  if (useExistsStorage(key)) {
    localStorage.removeItem(key);
    return true;
  } else {
    throw new LocalStorageCheckError(key);
  }
}

/**
 * Dumps the entire local storage. Bye.
 */
export function useClearAllStorage() {
  localStorage.clear();
}

/**
 * @returns The total length of the local storage.
 */
export function useGetLengthStorage(): number {
  return localStorage.length;
}
