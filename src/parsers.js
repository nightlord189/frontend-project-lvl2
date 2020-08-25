import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const fixIniNumbers = (data) => {
  if (_.isObject(data)) {
    const entries = Object.entries(data).map((entry) => [entry[0], fixIniNumbers(entry[1])]);
    return Object.fromEntries(entries);
  }
  if (Number.isInteger(parseInt(data))) {
    return parseInt(data, 10);
  }
  return data;
};

const parse = (rawData, extension) => {
  switch (extension) {
    case 'json':
      return JSON.parse(rawData);
    case 'yml':
    case 'yaml':
      return yaml.safeLoad(rawData);
    case 'ini':
      return fixIniNumbers(ini.parse(rawData));
    default:
      throw new Error(`unknown extension ${extension}`);
  }
};

export default parse;
