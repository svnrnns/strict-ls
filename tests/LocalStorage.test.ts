import LocalStorage from '../src/LocalStorage';
import { LocalStorageError, LocalStorageCheckError } from '../src/lib/ls-error';

describe('LocalStorage', () => {
  let storage: LocalStorage;

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    storage = new LocalStorage();
  });

  test('should set and get a value', () => {
    storage.set('testKey', { test: 'value' });
    expect(storage.get('testKey')).toEqual({ test: 'value' });
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
