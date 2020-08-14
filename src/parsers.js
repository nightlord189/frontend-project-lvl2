
const parse = (rawData, extension) => {
    switch (extension) {
        case 'json':
            return JSON.parse(rawData);
        default:
            return rawData;
    }
}

export default parse;