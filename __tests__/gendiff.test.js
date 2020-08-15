import { test, expect } from '@jest/globals';
import fs from 'fs';
import compareFlat from '../src/flat.js';

const fixturePath = '__tests__/__fixtures__';

test('flat_json', () => {
  let compare = compareFlat(`${fixturePath}/file1.json`, `${fixturePath}/file2.json`);
  let result = fs.readFileSync(`${fixturePath}/result1.txt`, { encoding: 'utf8', flag: 'r' });
  expect(compare).toEqual(result);

  compare = compareFlat(`${fixturePath}/empty.json`, `${fixturePath}/empty.json`);
  expect(compare.split(/\r?\n/)).toHaveLength(3);

  compare = compareFlat(`${fixturePath}/empty.json`, `${fixturePath}/file2.json`);
  result = fs.readFileSync(`${fixturePath}/result2.txt`, { encoding: 'utf8', flag: 'r' });
  expect(compare).toEqual(result);
});

test('flat_yaml', () => {
  const compare = compareFlat(`${fixturePath}/file1.yml`, `${fixturePath}/file2.yml`);
  const result = fs.readFileSync(`${fixturePath}/result1.txt`, { encoding: 'utf8', flag: 'r' });
  expect(compare).toEqual(result);
});

test('flat_ini', () => {
  const compare = compareFlat(`${fixturePath}/file1.ini`, `${fixturePath}/file2.ini`);
  const result = fs.readFileSync(`${fixturePath}/result1.txt`, { encoding: 'utf8', flag: 'r' });
  expect(compare).toEqual(result);
});

test('nested_json', () => {
  const compare = compareFlat(`${fixturePath}/file3.json`, `${fixturePath}/file4.json`);
  const result = fs.readFileSync(`${fixturePath}/result3.txt`, { encoding: 'utf8', flag: 'r' });
  expect(compare).toEqual(result);
});