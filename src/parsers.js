import yaml from 'js-yaml';

const parse = (rawData, extension) => {
    switch (extension) {
        case 'json':
            return JSON.parse(rawData);
        case 'yml':
        case 'yaml':
            const parsed = yaml.safeLoad(rawData);
            return parsed;
        default:
            return rawData;
    }
}

export default parse;