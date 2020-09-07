import _ from 'lodash';

const indent = '  ';

const getIndent = (count) => {
  return indent.repeat(count);
}

const valToString = (value, depth) => {
  if (_.isUndefined(value)) {
    return null;
  }
  if (!_.isObject(value)) {
    return value.toString();
  }
  const keysStr = Object.keys(value).map((key) => `${getIndent((depth + 1) * 2)}${key}: ${valToString(value[key], depth + 1)}`);
  return `{\r\n${keysStr.join('\r\n')}\r\n${getIndent(depth * 2)}}`;
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
           +`\r\n${getIndent(depth * 2 - 1)}+ ${node.key}: ${valueNew}`;
      case 'nested':
        return `${getIndent(depth * 2)}${node.key}: ${format(node.children, depth + 1)}`;
      default:
        return null;
    }
  }).join('\r\n');
  const result = `{\r\n${stringified}\r\n${getIndent(depth * 2 - 2)}}`;
  return result;
};

export default format;
