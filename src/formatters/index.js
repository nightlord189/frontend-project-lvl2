import formatStylish from './stylish.js';
import formatPlain from './plain.js';

const format = (ast, formatType) => {
  switch (formatType) {
    case 'stylish':
      return formatStylish(ast);
    case 'plain':
      return formatPlain(ast);
    default:
      throw new Error(`unknown format ${format}`);
  }
};

export default format;
