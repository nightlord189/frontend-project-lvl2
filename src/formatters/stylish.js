import _ from 'lodash';

const indent = '  ';

const getIndent = (count) => indent.repeat(count);

const valToString = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }
  const keysStr = Object.keys(value).map((key) => `${getIndent((depth + 1) * 2)}${key}: ${valToString(value[key], depth + 1)}`);
  return `{\n${keysStr.join('\n')}\n${getIndent(depth * 2)}}`;
};

const format = (nodes, depth = 1) => {
  const sorted = nodes.sort((a, b) => (a.key > b.key ? 1 : -1));
  const stringified = sorted.map((node) => {
    const value = valToString(node.value, depth);
    const valueNew = valToString(node.valueNew, depth);
    switch (node.status) {
      case 'same':
        return `${getIndent(depth * 2)}${node.key}: ${value}`;
      case 'remove':
        return `${getIndent(depth * 2 - 1)}- ${node.key}: ${value}`;
      case 'add':
        return `${getIndent(depth * 2 - 1)}+ ${node.key}: ${value}`;
      case 'change':
        return `${getIndent(depth * 2 - 1)}- ${node.key}: ${value}`
           + `\n${getIndent(depth * 2 - 1)}+ ${node.key}: ${valueNew}`;
      case 'nested':
        return `${getIndent(depth * 2)}${node.key}: ${format(node.children, depth + 1)}`;
      default:
        return null;
    }
  }).join('\n');
  const result = `{\n${stringified}\n${getIndent(depth * 2 - 2)}}`;
  return result;
};

export default format;
