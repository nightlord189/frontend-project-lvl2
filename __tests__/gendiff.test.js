import { test, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import genDiff from '../src/gendiff.js';

const testData = [
  ['file1.yml', 'file2.yml', 'stylish', 'result_flat.txt'],
  ['file1.ini', 'file2.ini', 'stylish', 'result_nested.txt'],
  ['file1.json', 'file2.json', 'stylish', 'result_nested.txt'],
  ['file1.json', 'file2.json', 'plain', 'result_plain_format.txt'],
  ['file1.json', 'file2.json', 'json', 'result_json_format.txt'],
  ['file1.ini', 'file2.ini', 'json', 'result_json_format.txt'],
];

const getFixturePath = (filename) => path.join('__fixtures__', filename);

test.each(testData)(
  '%p %p, format %p, result %p',
  (file1, file2, formatType, resultFile) => {
    const compare = genDiff(`${getFixturePath(file1)}`, `${getFixturePath(file2)}`, formatType);
    const result = fs.readFileSync(`${getFixturePath(resultFile)}`, 'utf8');
    expect(compare).toEqual(result);
  },
);
