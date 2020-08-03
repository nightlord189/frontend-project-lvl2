import fs from 'fs';
import _ from 'lodash';

/*
{
    status - add, remove, same, change
    oldValue
    newValue
}
*/

const itemToString = (item) => {
    switch (item.status) {
        case 'same':
            return `    ${item.key}: ${item.oldValue}\n`;
        case 'remove':
            return `  - ${item.key}: ${item.oldValue}\n`;
        case 'add':
            return `  + ${item.key}: ${item.newValue}\n`;
        case 'change':
            return `  - ${item.key}: ${item.oldValue}\n  + ${item.key}: ${item.newValue}\n`;        
    }
    return '';
}

const resultToString = (data) => {
    const dataArrStr = data.map(itemToString);
    const dataStr = dataArrStr.join('');
    const result = `{\n${dataStr}}`;
    return result;
}

const compare = (data1, data2) => {
    const result = {...data1, ...data2};
    for (let key of Object.keys(result)) {
        if (_.has(data1, key)) {
            result[key].oldValue = data1[key];
            if (_.has(data2, key)) {               
                if (data1[key] === data2[key]) {
                    result[key].status = 'same';
                } else {
                    result[key].status = 'change';
                    result[key].newValue = data2[key];
                }
            } else {
                result[key].status = 'remove';
            }
        } else {
            result[key].status = 'add';
            result[key].newValue = data2[key];
        }
    }
    const resultArr = Object.values(result);
    const sorted = resultArr.sort((a, b) => a.key > b.key ? 1 : -1);
    return sorted;
}

const compareSingle = (file1, file2) => {
  const file1Data = fs.readFileSync(file1, {encoding:'utf8', flag:'r'});
  const file2Data = fs.readFileSync(file2, {encoding:'utf8', flag:'r'});
  const data1 = JSON.parse(file1Data);
  const data2 = JSON.parse(file2Data);
  const result = compare(data1, data2);
  const resultStr = resultToString(result);
  return resultStr;
};

export { compareSingle };
