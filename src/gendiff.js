import fs from 'fs';
import path from 'path'
import parse from './parsers.js';
import buildAST from './ast.js';
import format from './formatters/index.js';

const genDiff = (file1, file2, formatType = 'stylish') => {
  const file1Data = fs.readFileSync(file1, 'utf8');
  const file2Data = fs.readFileSync(file2, 'utf8');
  const data1 = parse(file1Data, path.extname(file1).replace('.', ''));
  const data2 = parse(file2Data, path.extname(file2).replace('.', ''));
  const ast = buildAST(data1, data2);
  return format(ast, formatType);
};

export default genDiff;
