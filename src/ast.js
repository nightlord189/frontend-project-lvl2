import _ from 'lodash';
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
        status: 'removed',
        value: data1[key],
      };
    }
    if (!_.has(data1, key)) {
      return {
        key,
        status: 'added',
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
      status: 'changed',
      value: data1[key],
      valueNew: data2[key],
    };
  });
  return result;
};

export default buildAST;
