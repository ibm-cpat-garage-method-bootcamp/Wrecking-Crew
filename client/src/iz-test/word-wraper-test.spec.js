function wordWrap(words, column){
    let temparray = words.split(" ");
    let myarray = [];
    let templine = []; 
    temparray.forEach(word => {
        if(word.length >= column)
        {
        let arraylength  = word.length
        
        for( let index = 0 ; index < arraylength; index += column )
        {
            var myChunk = word.slice(index, index+column)
            
            myarray.push(myChunk)

        }
    
    }
    else{
        if(templine.length + word.length <= column)
        {
            templine.push(word);
        }
        else{
            
            var last = templine.pop();
             last+= "_"
             last+= word
            templine.push(last)

        }
    }
    
    });
    
    myarray.push(templine.join(" "));
    return myarray.join('_')
}

describe('word-wrap test', () =>
{
    test('a should return a when column is 1', () => {
        expect(wordWrap('a', 1)).toEqual('a');
    });

    test('aaa should return a_a_a when column is 1', () => {
        expect(wordWrap('aaa', 1)).toEqual('a_a_a');
    });

    test('aaaa should return aa_aa when column is 2', ()=>{
        expect(wordWrap('aaaa', 2)).toEqual('aa_aa')
    })

    test('a b c d should return a b_c d when column is 4', ()=>{
        expect(wordWrap('a b c d', 4)).toEqual('a b_c d')
    })

});