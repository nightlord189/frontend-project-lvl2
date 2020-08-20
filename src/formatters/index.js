import formatStylish from './stylish.js';
import formatPlain from './plain.js';
import formatJson from './json.js';

const format = (ast, formatType) => {
  switch (formatType) {
    case 'stylish':
      return formatStylish(ast);
    case 'plain':
      return formatPlain(ast);
    case 'json':
      return formatJson(ast);
    default:
      throw new Error(`unknown format ${format}`);
  }
};

export default format;
