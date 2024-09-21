import { isObject, isJSON, parseIfJSON } from '../src/lib/helpers';

import LocalStorage from '../src/LocalStorage';
import { LocalStorageError, LocalStorageCheckError } from '../src/lib/ls-error';

describe('LocalStorage', () => {
  let storage: LocalStorage;

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    storage = new LocalStorage();
  });

  test('should set and get an string', () => {
    storage.set('stringKey', 'hello');
    expect(storage.get('stringKey')).toBe('hello');
  });

  test('should set and get an object', () => {
    storage.set('testKey', { test: 'value' });
    expect(storage.get('testKey')).toEqual({ test: 'value' });
  });

  test('should set and get a Date object', () => {
    const date = new Date();
    storage.set('dateKey', date);
    expect(storage.get('dateKey')).toEqual(date);
  });

  test('should set and get a number', () => {
    storage.set('numberKey', 42);
    expect(storage.get('numberKey')).toBe(42);
  });

  test('should set and get a boolean', () => {
    storage.set('boolKey', true);
    expect(storage.get('boolKey')).toBe(true);
  });

  test('should throw an error if key does not exist', () => {
    expect(() => storage.get('nonExistentKey')).toThrow(LocalStorageCheckError);
  });

  test('should check if key exists', () => {
    storage.set('existingKey', 'value');
    expect(storage.exists('existingKey')).toBe(true);
    expect(storage.exists('nonExistentKey')).toBe(false);
  });

  test('should remove a key', () => {
    storage.set('keyToRemove', 'value');
    storage.remove('keyToRemove');
    expect(storage.exists('keyToRemove')).toBe(false);
  });

  test('should clear all storage', () => {
    storage.set('key1', 'value1');
    storage.set('key2', 'value2');
    storage.clear();
    expect(storage.length()).toBe(0);
  });

  test('should return the correct storage length', () => {
    storage.set('key1', 'value1');
    storage.set('key2', 'value2');
    expect(storage.length()).toBe(2);
  });

  test('should throw an error for empty namespace', () => {
    expect(() => storage.setNamespace('')).toThrow(LocalStorageError);
  });
});

describe('Helpers', () => {
  test('isJSON should return true for valid JSON strings', () => {
    expect(isJSON('{"key":"value"}')).toBe(true);
    expect(isJSON('[]')).toBe(true);
    expect(isJSON('not a json')).toBe(false);
  });

  test('parseIfJSON should parse JSON strings', () => {
    expect(parseIfJSON('{"key":"value"}')).toEqual({ key: 'value' });
    expect(parseIfJSON('string')).toBe('string');
  });
});
