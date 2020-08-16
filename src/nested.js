import fs from 'fs';
import _ from 'lodash';
import parse from './parsers.js';
import {formatDefault} from './formatters_nested.js'

/*
{
    key
    status - add, remove, same, change
    oldValue
    newValue (if add or change)
    depth
}
*/

const getAllKeys = (data1, data2) => {
    const merged = { ...(_.isObject(data1) ? data1 : {}), ...(_.isObject(data2) ? data2 : {}) };
    const result = Object.keys(merged);
    return result;
  };
  
  const compareMapKey = (item, data1, data2) => {
    console.log('\n');
    if (!_.has(data2, item.key)) {
        return {
            key: item.key,
            status: 'remove',
            oldValue: _.isObject(data1[item.key]) ? compare(data1[item.key], data1[item.key], item.depth) : data1[item.key],
            depth: item.depth
        }        
    }
    if (!_.has(data1, item.key)) {
        return {
            key: item.key,
            status: 'add',
            newValue: _.isObject(data2[item.key]) ? compare(data2[item.key], data2[item.key], item.depth) : data2[item.key],
            depth: item.depth
        }   
    }
    if (_.isEqual(data1[item.key], data2[item.key])) {
        return {
            key: item.key,
            status: 'same',
            oldValue: _.isObject(data1[item.key]) ? compare(data1[item.key], data2[item.key], item.depth) : data1[item.key],
            depth: item.depth
        }       
    }
    if (_.isObject(data1[item.key]) && _.isObject(data2[item.key])) {
        return {
            key: item.key,
            status: 'change',
            newValue: compare(data1[item.key], data2[item.key], item.depth),
            depth: item.depth
        }       
    }
    return {
        key: item.key,
        status: 'change',
        oldValue: _.isObject(data1[item.key]) ? compare(data1[item.key], data1[item.key], item.depth) : data1[item.key],
        newValue: _.isObject(data2[item.key]) ? compare(data2[item.key], data2[item.key], item.depth) : data2[item.key],
        depth: item.depth
    }
};

const compare = (data1, data2, depth=0) => {
    const keys = getAllKeys(data1, data2);
    const objectWithKeyArr = keys.map((key) => ({key, depth: depth + 1 }));
    const resultObj = objectWithKeyArr.map((item) => compareMapKey(item, data1, data2));
    const resultArr = Object.values(resultObj);
    return resultArr;
  };

const compareNested = (file1, file2) => {
    const file1Data = fs.readFileSync(file1, { encoding: 'utf8', flag: 'r' });
    const file2Data = fs.readFileSync(file2, { encoding: 'utf8', flag: 'r' });
    const data1 = parse(file1Data, file1.split('.')[1]);
    const data2 = parse(file2Data, file2.split('.')[1]);
    const result = compare(data1, data2);
    const resultStr = formatDefault(result);
    return resultStr;
}

export default compareNested;