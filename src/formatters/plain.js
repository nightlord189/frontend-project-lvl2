import _ from 'lodash';

const stringifyValue = (value) => {
  if (!_.isObject(value)) {
    return _.isString(value) ? `'${value}'` : value;
  }
  return '[complex value]';
};

const getPropertyName = (property, parent) => (parent !== null ? `${parent}.${property}` : property);

const format = (nodes, parent = null) => {
  const sorted = [...nodes].sort((a, b) => (a.key > b.key ? 1 : -1));
  const stringified = sorted.filter((x) => x.status !== 'same').map((node) => {
    const property = getPropertyName(node.key, parent);
    switch (node.status) {
      case 'removed':
        return `Property '${property}' was removed`;
      case 'added':
        return `Property '${property}' was added with value: ${stringifyValue(node.value)}`;
      case 'changed':
        return `Property '${property}' was updated. From ${stringifyValue(node.value)} to ${stringifyValue(node.valueNew)}`;
      case 'nested':
        return format(node.children, property);
      default:
        throw new Error(`unknown node status ${node.status}`);
    }
  });
  const result = stringified.filter((x) => !_.isNull(x)).join('\n');
  return result;
};

export default format;
