import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import buildAST from './ast.js';
import format from './formatters/index.js';

const genDiff = (filePathBefore, filePathAfter, formatType = 'stylish') => {
  const fileDataBefore = fs.readFileSync(filePathBefore, 'utf8');
  const fileDataAfter = fs.readFileSync(filePathAfter, 'utf8');
  const parsedBefore = parse(fileDataBefore, path.extname(filePathBefore).replace('.', ''));
  const parsedAfter = parse(fileDataAfter, path.extname(filePathAfter).replace('.', ''));
  const ast = buildAST(parsedBefore, parsedAfter);
  return format(ast, formatType);
};

export default genDiff;
