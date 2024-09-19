import { LocalStorageError } from './lib/ls-error';

import {
  useGetStorage,
  useSetStorage,
  useExistsStorage,
  useRemoveKeyStorage,
  useClearAllStorage,
  useGetLengthStorage,
} from './lib/ls-api';

import { GenericItem } from './lib/types';

/**
 * A class for managing local storage with optional namespacing.
 */
export default class LocalStorage {
  private namespace: string;

  constructor(namespace = '') {
    this.namespace = namespace;
  }

  private _getNamespacedKey(key: string): string {
    return this.namespace ? `${this.namespace}:${key}` : key;
  }

  public getNamespace(): string {
    return this.namespace;
  }

  public setNamespace(namespace: string): boolean {
    if (!namespace) {
      throw new LocalStorageError('Namespace variable not provided');
    }
    if (typeof namespace !== 'string') {
      throw new LocalStorageError('Namespace variable must be of type string');
    }
    this.namespace = namespace;
    return true;
  }

  public get(key: string): GenericItem {
    const nskey = this._getNamespacedKey(key);
    return useGetStorage(nskey);
  }

  public set(key: string, value: GenericItem): boolean {
    const nskey = this._getNamespacedKey(key);
    return useSetStorage(nskey, value);
  }

  public exists(key: string): boolean {
    const nskey = this._getNamespacedKey(key);
    return useExistsStorage(nskey);
  }

  public remove(key: string): boolean {
    const nskey = this._getNamespacedKey(key);
    return useRemoveKeyStorage(nskey);
  }

  public clear(): void {
    useClearAllStorage();
  }

  public length(): number {
    return useGetLengthStorage();
  }
}
