import { test, expect, describe } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import genDiff from '../src/gendiff.js';

const fileExtensions = ['json', 'yml', 'ini'];
const formatTypes = ['stylish', 'json', 'plain'];

const getFixturePath = (filename) => path.join('__fixtures__', filename);

describe.each(formatTypes)('compare', (format) => {
  test.each(fileExtensions)(`${format} %p`, (ext) => {
    const compare = genDiff(`${getFixturePath(`file1.${ext}`)}`, `${getFixturePath(`file2.${ext}`)}`, format);
    const result = fs.readFileSync(`${getFixturePath(`result_${format}.txt`)}`, 'utf8');
    expect(compare).toEqual(result);
  });
});
