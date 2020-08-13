import { test, expect } from '@jest/globals';
import fs from 'fs';
import compareSingle from '../src/single.js';

test('single', () => {
  let compare = compareSingle('__fixtures__/single/file1.json', '__fixtures__/single/file2.json');
  let result = fs.readFileSync('__fixtures__/single/result1.txt', { encoding: 'utf8', flag: 'r' });
  expect(compare).toEqual(result);

  compare = compareSingle('__fixtures__/single/empty.json', '__fixtures__/single/empty.json');
  expect(compare.split(/\r?\n/)).toHaveLength(3);

  compare = compareSingle('__fixtures__/single/empty.json', '__fixtures__/single/file2.json');
  result = fs.readFileSync('__fixtures__/single/result2.txt', { encoding: 'utf8', flag: 'r' });
  expect(compare).toEqual(result);
});
