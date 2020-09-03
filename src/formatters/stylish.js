import _ from 'lodash';

const indent = '  ';

const valToString = (value, depth) => {
  if (!_.isObject(value)) {
    return value.toString();
  }
  const keysStr = Object.keys(value).map((key) => `${indent.repeat((depth + 1) * 2)}${key}: ${valToString(value[key], depth + 1)}`);
  return `{\r\n${keysStr.join('\r\n')}\r\n${indent.repeat(depth * 2)}}`;
};

const format = (nodes, depth = 1) => {
  const sorted = nodes.sort((a, b) => (a.key > b.key ? 1 : -1));
  const stringified = sorted.map((node) => {
    switch (node.status) {
      case 'same':
        return `${indent.repeat(depth * 2)}${node.key}: ${valToString(node.value, depth)}`;
      case 'remove':
        return `${indent.repeat(depth * 2 - 1)}- ${node.key}: ${valToString(node.value, depth)}`;
      case 'add':
        return `${indent.repeat(depth * 2 - 1)}+ ${node.key}: ${valToString(node.value, depth)}`;
      case 'change':
        return `${indent.repeat(depth * 2 - 1)}- ${node.key}: ${valToString(node.value, depth)}\r\n${indent.repeat(depth * 2 - 1)}+ ${node.key}: ${valToString(node.valueNew, depth)}`;
      case 'nested':
        return `${indent.repeat(depth * 2)}${node.key}: ${format(node.children, depth + 1)}`;
      default:
        return null;
    }
  });
  const dataStr = stringified.join('\r\n');
  const result = `{\r\n${dataStr}\r\n${indent.repeat(depth * 2 - 2)}}`;
  return result;
};

export default format;
