function wordWrap(fullStringNoLineBreaks, columnWidth){
    const lineBreakRegex = new RegExp(`((.{1,${columnWidth}}[\\s]{1})|(.{${columnWidth}}))`,'g');
    const lineBrokenString = fullStringNoLineBreaks.replace(lineBreakRegex, (match, p1,p2)=>{
        const replaceValue = p1.trim()+'\n'
        return replaceValue
    }).trim()
    return lineBrokenString;
}

describe('Test wordWrap function', ()=>{

    test("Canary test validates test infrastructure",(done)=>{
        expect(true).toEqual(true);
        done();
    })
    test("wordWrap(a, 1) returns a",(done)=>{
        expect(wordWrap('a',1)).toEqual('a');
        done();
    })

    test("wordWrap(b, 1) returns b",(done)=>{
        expect(wordWrap('b',1)).toEqual('b');
        done();
    })

    test("wordWrap('hello', 4) returns hell\no",(done)=>{
        expect(wordWrap('hello',4)).toEqual('hell\no');
        done();
    })
    test("wordWrap('hello', 4) returns hell\no",(done)=>{
        expect(wordWrap('hello',4)).toEqual('hell\no');
        done();
    })
    test("wordWrap('hello governor', 4) returns hell\no go\nvern\nor",(done)=>{
        expect(wordWrap('hello governor',4)).toEqual('hell\no\ngove\nrnor');
        done();
    })
    test("wordWrap('hello governor', 5) returns hello\ngovern\nor",(done)=>{
        expect(wordWrap('hello governor',5)).toEqual('hello\ngover\nnor');
        done();
    })

    test("wordWrap('michael myers is coming for you', 4) returns mich\nael\nmyer\ns is\ncomi\nng f\nor y\nou",(done)=>{
        expect(wordWrap('michael myers is coming for you', 4)).toEqual('mich\nael\nmyer\ns is\ncomi\nng\nfor\nyou')
        done()
    })

    test("wordWrap('supercalifragilisticexpialidocious', 6) returns superc\nalifra\ngilist\nicexpi\nalidoc\nious",(done)=>{
        expect(wordWrap('supercalifragilisticexpialidocious', 6)).toEqual('superc\nalifra\ngilist\nicexpi\nalidoc\nious')
        done()
    })

    test("wordWrap('The Big Haunted House', 7) returns 'The\nBig\nHaunted\nHouse'", (done)=>{
        expect(wordWrap('The Big Haunted House', 7)).toEqual('The Big\nHaunted\nHouse')
        done()
    })
    test("wordWrap('The Haunted House', 7) returns 'The\nHaunted\nHouse'", (done)=>{
        expect(wordWrap('The Haunted House', 7)).toEqual('The\nHaunted\nHouse')
        done()
    })
    test("wordWrap('Go off and see to it that we are no longer oppressed by our abusive tyranny', 7)", (done)=>{
        expect(wordWrap('Go off and see to it that we are no longer oppressed by our abusive tyranny',12))
            .toEqual('Go off and\nsee to it\nthat we are\nno longer\noppressed by\nour abusive\ntyranny')
        done()
    })
})