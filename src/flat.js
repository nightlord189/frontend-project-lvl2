import fs from 'fs';
import _ from 'lodash';
import parse from './parsers.js';
import {formatDefault} from './formatters.js'

/*
{
    key
    status - add, remove, same, change
    oldValue
    newValue
}
*/

const getAllKeys = (data1, data2) => {
  const merged = { ...data1, ...data2 };
  const result = Object.keys(merged);
  return result;
};

const compareMapKey = (item, data1, data2) => {
  if (_.has(data1, item.key)) {
    if (_.has(data2, item.key)) {
      if (data1[item.key] === data2[item.key]) {
        return {
          key: item.key,
          status: 'same',
          oldValue: data1[item.key],
        };
      }
      return {
        key: item.key,
        status: 'change',
        oldValue: data1[item.key],
        newValue: data2[item.key],
      };
    }
    return {
      key: item.key,
      status: 'remove',
      oldValue: data1[item.key],
    };
  }
  return {
    key: item.key,
    status: 'add',
    newValue: data2[item.key],
  };
};

const compare = (data1, data2) => {
  const keys = getAllKeys(data1, data2);
  const objectWithKeyArr = keys.map((key) => ({key}));
  const resultObj = objectWithKeyArr.map((item) => compareMapKey(item, data1, data2));
  const resultArr = Object.values(resultObj);
  const sorted = resultArr.sort((a, b) => (a.key > b.key ? 1 : -1));
  return sorted;
};

const compareFlat = (file1, file2) => {
  const file1Data = fs.readFileSync(file1, { encoding: 'utf8', flag: 'r' });
  const file2Data = fs.readFileSync(file2, { encoding: 'utf8', flag: 'r' });
  const data1 = parse(file1Data, file1.split('.')[1]);
  const data2 = parse(file2Data, file2.split('.')[1]);
  const result = compare(data1, data2);
  const resultStr = formatDefault(result);
  return resultStr;
};

export default compareFlat;