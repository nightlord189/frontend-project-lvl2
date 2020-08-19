import { test, expect } from '@jest/globals';
import fs from 'fs';
import compareNested from '../src/nested.js';

const fixturePath = '__tests__/__fixtures__';

test('flat_yaml', () => {
  const compare = compareNested(`${fixturePath}/file1.yml`, `${fixturePath}/file2.yml`);
  const result = fs.readFileSync(`${fixturePath}/result1.txt`, { encoding: 'utf8', flag: 'r' });
  expect(compare).toEqual(result);
});

test('flat_ini', () => {
  const compare = compareNested(`${fixturePath}/file1.ini`, `${fixturePath}/file2.ini`);
  const result = fs.readFileSync(`${fixturePath}/result1.txt`, { encoding: 'utf8', flag: 'r' });
  expect(compare).toEqual(result);
});

test('nested_json', () => {
  const compare = compareNested(`${fixturePath}/file1.json`, `${fixturePath}/file2.json`);
  const result = fs.readFileSync(`${fixturePath}/result3.txt`, { encoding: 'utf8', flag: 'r' });
  expect(compare).toEqual(result);
});

test('plain_formatter', () => {
  const compare = compareNested(`${fixturePath}/file1.json`, `${fixturePath}/file2.json`, 'plain');
  const result = fs.readFileSync(`${fixturePath}/result_plain_format.txt`, { encoding: 'utf8', flag: 'r' });
  expect(compare).toEqual(result);
});
