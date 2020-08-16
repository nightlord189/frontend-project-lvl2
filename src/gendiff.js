import compareNested from './nested.js';

const genDiff = (file1, file2, format) => compareNested(file1, file2, format);

export default genDiff;
