import { test, expect } from '@jest/globals';
import fs from 'fs';
import genDiff from '../src/gendiff.js';

const fixturePath = '__tests__/__fixtures__';

test('flat_yaml', () => {
  const compare = genDiff(`${fixturePath}/file1.yml`, `${fixturePath}/file2.yml`);
  const result = fs.readFileSync(`${fixturePath}/result_flat.txt`, { encoding: 'utf8', flag: 'r' });
  expect(compare).toEqual(result);
});

test('flat_ini', () => {
  const compare = genDiff(`${fixturePath}/file1.ini`, `${fixturePath}/file2.ini`);
  const result = fs.readFileSync(`${fixturePath}/result_flat.txt`, { encoding: 'utf8', flag: 'r' });
  expect(compare).toEqual(result);
});

test('nested_json', () => {
  const compare = genDiff(`${fixturePath}/file1.json`, `${fixturePath}/file2.json`);
  const result = fs.readFileSync(`${fixturePath}/result_nested.txt`, { encoding: 'utf8', flag: 'r' });
  expect(compare).toEqual(result);
});

test('plain_formatter', () => {
  const compare = genDiff(`${fixturePath}/file1.json`, `${fixturePath}/file2.json`, 'plain');
  const result = fs.readFileSync(`${fixturePath}/result_plain_format.txt`, { encoding: 'utf8', flag: 'r' });
  expect(compare).toEqual(result);
});

test('json_formatter', () => {
  const compare = genDiff(`${fixturePath}/file1.json`, `${fixturePath}/file2.json`, 'json');
  const result = fs.readFileSync(`${fixturePath}/result_json_format.txt`, { encoding: 'utf8', flag: 'r' });
  expect(compare).toEqual(result);
});
