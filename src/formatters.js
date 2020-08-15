const itemToString = (item) => {
    switch (item.status) {
      case 'same':
        return `    ${item.key}: ${item.oldValue}`;
      case 'remove':
        return `  - ${item.key}: ${item.oldValue}`;
      case 'add':
        return `  + ${item.key}: ${item.newValue}`;
      case 'change':
        return `  - ${item.key}: ${item.oldValue}\r\n  + ${item.key}: ${item.newValue}`;
      default:
        return '';
    }
  };
  
const formatDefault = (data) => {
    const dataArrStr = data.map(itemToString);
    const dataStr = dataArrStr.join('\r\n');
    const result = `{\r\n${dataStr}\r\n}`;
    return result;
};

export {formatDefault}