import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import buildAST from './ast.js';
import format from './formatters/index.js';

const parseFile = (filePath) => {
  const fileData = fs.readFileSync(filePath, 'utf8');
  return parse(fileData, path.extname(filePath).replace('.', ''));
}

const genDiff = (filePathBefore, filePathAfter, formatType = 'stylish') => {
  const parsedBefore = parseFile(filePathBefore);
  const parsedAfter = parseFile(filePathAfter);
  const ast = buildAST(parsedBefore, parsedAfter);
  return format(ast, formatType);
};

export default genDiff;
