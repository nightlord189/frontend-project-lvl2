import _ from 'lodash';

const stringPrefix = '  ';

const valueToString = (value, depth) => {
  if (value == null) {
    throw new Error('dd');
  }
  if (!_.isObject(value)) {
    return value.toString();
  }
  return format(value, depth);
};

const nodeToString = (node) => {
  switch (node.status) {
    case 'same':
      return `${stringPrefix.repeat(node.depth * 2)}${node.key}: ${valueToString(node.oldValue, node.depth)}`;
    case 'remove':
      return `${stringPrefix.repeat(node.depth * 2 - 1)}- ${node.key}: ${valueToString(node.oldValue, node.depth)}`;
    case 'add':
      return `${stringPrefix.repeat(node.depth * 2 - 1)}+ ${node.key}: ${valueToString(node.newValue, node.depth)}`;
    case 'change':
      if (node.oldValue == null || node.oldValue == undefined) {
        return `${stringPrefix.repeat(node.depth * 2)}${node.key}: ${valueToString(node.newValue, node.depth)}`;
      }
      return `${stringPrefix.repeat(node.depth * 2 - 1)}- ${node.key}: ${valueToString(node.oldValue, node.depth)}\r\n${stringPrefix.repeat(node.depth * 2 - 1)}+ ${node.key}: ${valueToString(node.newValue, node.depth)}`;
    default:
      return '';
  }
};

const format = (nodes, depth = 0) => {
  const sorted = nodes.sort((a, b) => (a.key > b.key ? 1 : -1));
  const dataArrStr = sorted.map(nodeToString);
  const dataStr = dataArrStr.join('\r\n');
  const result = `{\r\n${dataStr}\r\n${stringPrefix.repeat(depth * 2)}}`;
  return result;
};

export default format;
