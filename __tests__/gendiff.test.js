import { test, expect } from '@jest/globals';
import fs from 'fs';
import genDiff from '../src/gendiff.js';
import path from 'path';

const getFixturePath = (filename) => path.join('__fixtures__', filename);

test('flat_yaml', () => {
  const compare = genDiff(`${getFixturePath('file1.yml')}`, `${getFixturePath('file2.yml')}`);
  const result = fs.readFileSync(`${getFixturePath('result_flat.txt')}`, { encoding: 'utf8', flag: 'r' });
  expect(compare).toEqual(result);
});

test('flat_ini', () => {
  const compare = genDiff(`${getFixturePath('file1.ini')}`, `${getFixturePath('file2.ini')}`);
  const result = fs.readFileSync(`${getFixturePath('result_flat.txt')}`, { encoding: 'utf8', flag: 'r' });
  expect(compare).toEqual(result);
});

test('nested_json', () => {
  const compare = genDiff(`${getFixturePath('file1.json')}`, `${getFixturePath('file2.json')}`);
  const result = fs.readFileSync(`${getFixturePath('result_nested.txt')}`, { encoding: 'utf8', flag: 'r' });
  expect(compare).toEqual(result);
});

test('plain_formatter', () => {
  const compare = genDiff(`${getFixturePath('file1.json')}`, `${getFixturePath('file2.json')}`, 'plain');
  const result = fs.readFileSync(`${getFixturePath('result_plain_format.txt')}`, { encoding: 'utf8', flag: 'r' });
  expect(compare).toEqual(result);
});

test('json_formatter', () => {
  const compare = genDiff(`${getFixturePath('file1.json')}`, `${getFixturePath('file2.json')}`, 'json');
  const result = fs.readFileSync(`${getFixturePath('result_json_format.txt')}`, { encoding: 'utf8', flag: 'r' });
  expect(compare).toEqual(result);
});
