import fs from 'fs';
import _ from 'lodash';
import parse from './parsers.js';
import formatStylish from './formatters/stylish.js';
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

const compareMapKey = (item, data1, data2) => {
  if (!_.has(data2, item.key)) {
    return {
      key: item.key,
      status: 'remove',
      oldValue: _.isObject(data1[item.key]) ? compare(data1[item.key], data1[item.key], item.depth) : data1[item.key],
      depth: item.depth,
    };
  }
  if (!_.has(data1, item.key)) {
    return {
      key: item.key,
      status: 'add',
      newValue: _.isObject(data2[item.key]) ? compare(data2[item.key], data2[item.key], item.depth) : data2[item.key],
      depth: item.depth,
    };
  }
  if (_.isEqual(data1[item.key], data2[item.key])) {
    return {
      key: item.key,
      status: 'same',
      oldValue: _.isObject(data1[item.key]) ? compare(data1[item.key], data2[item.key], item.depth) : data1[item.key],
      depth: item.depth,
    };
  }
  if (_.isObject(data1[item.key]) && _.isObject(data2[item.key])) {
    return {
      key: item.key,
      status: 'change',
      newValue: compare(data1[item.key], data2[item.key], item.depth),
      depth: item.depth,
    };
  }
  return {
    key: item.key,
    status: 'change',
    oldValue: _.isObject(data1[item.key]) ? compare(data1[item.key], data1[item.key], item.depth) : data1[item.key],
    newValue: _.isObject(data2[item.key]) ? compare(data2[item.key], data2[item.key], item.depth) : data2[item.key],
    depth: item.depth,
  };
};

const compare = (data1, data2) => {
  const keys = getAllKeys(data1, data2);
  const resultObj = keys.map((key)=> {
    if (!_.has(data2, key)) {
      return {
        key,
        status: 'remove',
        value: data1[key]
      };
    }
    if (!_.has(data1, key)) {
      return {
        key,
        status: 'add',
        value: data2[key]
      };
    }
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return {
        key,
        status: 'nested',
        children: compare(data1[key], data2[key])
      };
    }
    if (_.isEqual(data1[key], data2[key])) {
      return {
        key,
        status: 'same',
        value: data1[key]
      };
    } 
    return {
      key,
      status: 'change',
      value: data1[key],
      valueNew: data2[key]
    };               
  });
  return resultObj;
};

const compareNested = (file1, file2, format) => {
  const file1Data = fs.readFileSync(file1, { encoding: 'utf8', flag: 'r' });
  const file2Data = fs.readFileSync(file2, { encoding: 'utf8', flag: 'r' });
  const data1 = parse(file1Data, file1.split('.')[1]);
  const data2 = parse(file2Data, file2.split('.')[1]);
  const result = compare(data1, data2);
  switch (format) {
    case 'stylish':
      return formatStylish(result);
    default:
      throw new Error(`unknown format ${format}`);
  }
};

export default compareNested;
