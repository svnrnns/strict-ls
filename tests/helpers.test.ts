import { isObject, isJSON, parseIfJSON } from '../src/lib/helpers';

describe('Helpers', () => {
  test('isObject should return true for objects', () => {
    expect(isObject({})).toBe(true);
    expect(isObject([])).toBe(false);
    expect(isObject(null)).toBe(false);
  });

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
