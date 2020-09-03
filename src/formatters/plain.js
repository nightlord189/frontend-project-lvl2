import _ from 'lodash';

const valToString = (value) => {
  if (!_.isObject(value)) {
    if (_.isBoolean(value) || _.isNumber(value)) {
      return value.toString();
    }
    return `'${value}'`;
  }
  return '[complex value]';
};

const getPropertyName = (property, parent) => (parent !== null ? `${parent}.${property}` : property);

const format = (nodes, parent = null) => {
  const sorted = [...nodes].sort((a, b) => (a.key > b.key ? 1 : -1));
  const stringified = sorted.map((node) => {
    const property = getPropertyName(node.key, parent);
    switch (node.status) {
      case 'remove':
        return `Property '${property}' was removed`;
      case 'add':
        return `Property '${property}' was added with value: ${valToString(node.value)}`;
      case 'change':
        return `Property '${property}' was updated. From ${valToString(node.value)} to ${valToString(node.valueNew)}`;
      case 'nested':
        return format(node.children, property);
      default:
        return null;
    }
  });
  const result = stringified.filter((x) => x !== null).join('\r\n');
  return result;
};

export default format;
