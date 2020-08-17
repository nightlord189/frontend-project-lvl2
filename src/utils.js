import _ from 'lodash';

const getAllKeys = (data1, data2) => {
  const merged = { ...(_.isObject(data1) ? data1 : {}), ...(_.isObject(data2) ? data2 : {}) };
  const result = Object.keys(merged);
  return result;
};

export default getAllKeys;
