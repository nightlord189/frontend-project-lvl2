import _ from 'lodash';

const indent = '  ';

const valueToString = (value, depth) => {
    if (!_.isObject(value)) {
        return value.toString();
    }
    const keysStr = Object.keys(value).map((key)=>{
        return `${indent.repeat(depth * 3)}${key}: ${valueToString(value[key], depth+1)}`;
    });
    return `{\r\n${keysStr.join('\r\n')}\r\n${indent.repeat(depth * 2 - 1)}}`;
}

const format = (nodes, depth = 1) => {
    const sorted = nodes.sort((a, b) => (a.key > b.key ? 1 : -1));
    const dataArrStr = sorted.map((node)=> {
        switch (node.status) {
            case 'same':
              return `${indent.repeat(depth * 2)}${node.key}: ${valueToString(node.value, depth)}`;
            case 'remove':
              return `${indent.repeat(depth * 2 - 1)}- ${node.key}: ${valueToString(node.value, depth)}`;
            case 'add':
              return `${indent.repeat(depth * 2 - 1)}+ ${node.key}: ${valueToString(node.value, depth)}`;
            case 'change':
              return `${indent.repeat(depth * 2 - 1)}- ${node.key}: ${valueToString(node.value, node.depth)}\r\n${indent.repeat(depth * 2 - 1)}+ ${node.key}: ${valueToString(node.valueNew, depth)}`;
            case 'nested':
              return `${indent.repeat(depth * 2)}${node.key}: ${format (node.children, depth + 1)}`;
            default:
              return '';
          }
    });
    const dataStr = dataArrStr.join('\r\n');
    const result = `{\r\n${dataStr}\r\n${indent.repeat(depth * 2 - 2)}}`;
    return result;
  };
  
  export default format;
