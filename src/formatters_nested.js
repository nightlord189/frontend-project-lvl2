
const stringPrefix='  ';

const nodeToString = (node) => {
    if (node.children !== undefined) {
        switch (node.status) {
            case 'same':
              return `${stringPrefix.repeat(node.depth*2)}${node.key}: ${formatDefault (node.children, node.depth)}`;    
            case 'change':
              return `${stringPrefix.repeat(node.depth*2)}${node.key}: ${formatDefault (node.children, node.depth)}`;
            case 'add':
              return `${stringPrefix.repeat(node.depth*2-1)}+ ${node.key}: ${formatDefault (node.children, node.depth)}`;    
            case 'remove':
              return `${stringPrefix.repeat(node.depth*2-1)}- ${node.key}: ${formatDefault (node.children, node.depth)}`;              
            default:
              return '';
        }
    }
    switch (node.status) {
      case 'same':
        return `${stringPrefix.repeat(node.depth*2)}${node.key}: ${node.oldValue}`;
      case 'remove':
        return `${stringPrefix.repeat(node.depth*2-1)}- ${node.key}: ${node.oldValue}`;
      case 'add':
        return `${stringPrefix.repeat(node.depth*2-1)}+ ${node.key}: ${node.newValue}`;
      case 'change':
        return `${stringPrefix.repeat(node.depth*2-1)}- ${node.key}: ${node.oldValue}\r\n${stringPrefix.repeat(node.depth*2-1)}+ ${node.key}: ${node.newValue}`;
      default:
        return '';
    }
}

const formatDefault = (nodes, depth=0) => {
    const dataArrStr = nodes.map(nodeToString);
    const dataStr = dataArrStr.join('\r\n');
    const result = `{\r\n${dataStr}\r\n${stringPrefix.repeat(depth*2)}}`;
    return result;
}

export {formatDefault}