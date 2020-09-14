import _ from 'lodash'

const getAllKeys = (obj1, obj2) => _.union(Object.keys(obj1),Object.keys(obj2));

export default getAllKeys;
