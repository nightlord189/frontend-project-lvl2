import yaml from 'js-yaml';
import ini from 'ini'

const parse = (rawData, extension) => {
  switch (extension) {
    case 'json':
      return JSON.parse(rawData);
    case 'yml':
    case 'yaml':
      return yaml.safeLoad(rawData);
    case 'ini':
      return ini.parse(rawData);
    default:
      throw new Error('unknown extension '+extension);
  }
};

export default parse;
