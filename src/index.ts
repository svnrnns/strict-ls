import LocalStorage from './LocalStorage';
import { GenericItem } from './lib/types';

const defaultLocalStorage = new LocalStorage();

const get = (key: string): GenericItem => defaultLocalStorage.get(key);
const set = (key: string, value: GenericItem): boolean =>
  defaultLocalStorage.set(key, value);
const exists = (key: string): boolean => defaultLocalStorage.exists(key);
const remove = (key: string): boolean => defaultLocalStorage.remove(key);
const clear = (): void => defaultLocalStorage.clear();
const length = (): number => defaultLocalStorage.length();

export default LocalStorage;
export { get, set, exists, remove, clear, length };
