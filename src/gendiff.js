import fs from 'fs';
import path from 'path'
import _ from 'lodash';
import parse from './parsers.js';
import format from './formatters/index.js';
import getAllKeys from './utils.js';

/*
{
    key
    status - add, remove, same, change, nested
    value
    valueNew(if change)
    children
}
*/

const buildAST = (data1, data2) => {
  const keys = getAllKeys(data1, data2);
  const result = keys.map((key) => {
    if (!_.has(data2, key)) {
      return {
        key,
        status: 'remove',
        value: data1[key],
      };
    }
    if (!_.has(data1, key)) {
      return {
        key,
        status: 'add',
        value: data2[key],
      };
    }
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return {
        key,
        status: 'nested',
        children: buildAST(data1[key], data2[key]),
      };
    }
    if (_.isEqual(data1[key], data2[key])) {
      return {
        key,
        status: 'same',
        value: data1[key],
      };
    }
    return {
      key,
      status: 'change',
      value: data1[key],
      valueNew: data2[key],
    };
  });
  return result;
};

const genDiff = (file1, file2, formatType = 'stylish') => {
  const file1Data = fs.readFileSync(file1, 'utf8');
  const file2Data = fs.readFileSync(file2, 'utf8');
  const data1 = parse(file1Data, path.extname(file1).replace('.', ''));
  const data2 = parse(file2Data, path.extname(file2).replace('.', ''));
  const ast = buildAST(data1, data2);
  return format(ast, formatType);
};

export default genDiff;
