import _ from 'lodash';

const valueToString = (value) => {
  if (!_.isObject(value)) {
    if (_.isBoolean(value)) {
      return value.toString();
    }
    return `'${value}'`;
  }
  return '[complex value]';
};

const getPropertyName = (property, parent) => (parent !== '' ? `${parent}.${property}` : property);

const format = (nodes, parent = '') => {
  const sorted = nodes.sort((a, b) => (a.key > b.key ? 1 : -1));
  const dataArrStr = sorted.map((node) => {
    const property = getPropertyName(node.key, parent);
    switch (node.status) {
      case 'remove':
        return `Property '${property}' was removed`;
      case 'add':
        return `Property '${property}' was added with value: ${valueToString(node.value)}`;
      case 'change':
        return `Property '${property}' was updated. From ${valueToString(node.value)} to ${valueToString(node.valueNew)}`;
      case 'nested':
        return format(node.children, property);
      default:
        return '';
    }
  });
  const result = dataArrStr.filter((x) => x != '').join('\r\n');
  return result;
};

export default format;
