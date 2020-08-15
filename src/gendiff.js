import compareNested from './nested.js';

const genDiff = (file1, file2) => compareNested(file1, file2);

export default genDiff;
