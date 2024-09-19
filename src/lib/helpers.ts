import { GenericItem } from './types';

function isObject(obj: any) {
  return obj !== null && typeof obj === 'object' && !Array.isArray(obj);
}

function isJSON(str: string): boolean {
  try {
    const obj = JSON.parse(str);
    return typeof obj === 'object' && obj !== null && !Array.isArray(obj);
  } catch (error) {
    return false;
  }
}

function parseIfJSON(item: string): GenericItem {
  return isJSON(item) ? JSON.parse(item) : item;
}

export { isObject, isJSON, parseIfJSON };
