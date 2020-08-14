import yaml from 'js-yaml';

const parse = (rawData, extension) => {
  switch (extension) {
    case 'json':
      return JSON.parse(rawData);
    case 'yml':
    case 'yaml':
      return yaml.safeLoad(rawData);
    default:
      return rawData;
  }
};

export default parse;
