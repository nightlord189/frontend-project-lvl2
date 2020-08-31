import _ from 'lodash';

const getAllKeys = (data1, data2) => {
  const merged = { ...data1, ...data2 };
  const result = Object.keys(merged);
  return result;
};

export default getAllKeys;
