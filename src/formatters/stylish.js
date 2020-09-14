import _ from 'lodash';

const indent = '  ';

const getIndent = (count) => indent.repeat(count);

const stringifyValue = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }
  const keysStr = Object.keys(value).map((key) => `${getIndent((depth + 1) * 2)}${key}: ${stringifyValue(value[key], depth + 1)}`);
  return `{\n${keysStr.join('\n')}\n${getIndent(depth * 2)}}`;
};

const format = (nodes, depth = 1) => {
  const sorted = nodes.sort((a, b) => (a.key > b.key ? 1 : -1));
  const stringified = sorted.map((node) => {
    const value = stringifyValue(node.value, depth);
    const valueNew = stringifyValue(node.valueNew, depth);
    switch (node.status) {
      case 'same':
        return `${getIndent(depth * 2)}${node.key}: ${value}`;
      case 'removed':
        return `${getIndent(depth * 2 - 1)}- ${node.key}: ${value}`;
      case 'added':
        return `${getIndent(depth * 2 - 1)}+ ${node.key}: ${value}`;
      case 'changed':
        return `${getIndent(depth * 2 - 1)}- ${node.key}: ${value}\n${getIndent(depth * 2 - 1)}+ ${node.key}: ${valueNew}`;
      case 'nested':
        return `${getIndent(depth * 2)}${node.key}: ${format(node.children, depth + 1)}`;
      default:
        throw new Error(`unknown node status ${node.status}`);
    }
  }).join('\n');
  const result = `{\n${stringified}\n${getIndent(depth * 2 - 2)}}`;
  return result;
};

export default format;
