import compareSingle from '../src/single.js';

test ('single', ()=> {
    console.log('dd');
    const d = compareSingle('file1.json', 'file2.json');
    expect(3).toEqual(3);
})