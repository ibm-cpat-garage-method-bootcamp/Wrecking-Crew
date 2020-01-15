function fahrenheitToCelsius(far){
    return (far-32) * 5 / 9;
}

describe('Test Fahrenheit to Celsius conversion function', ()=>{

    test("32 degrees fahrenheit is 0 degrees celsius",(done)=>{
        const far1 = 32
        const cel1 = fahrenheitToCelsius(far1);
        const expectedCel1 = 0;
        expect(cel1).toEqual(expectedCel1);
        done();
    })

    test("-40 degrees fahrenheit is -40 degrees celsius",(done)=>{
        const far2 = -40;
        const cel2 = fahrenheitToCelsius(far2);
        const expectedCel2 = -40;
        expect(cel2).toEqual(expectedCel2);
        done();
    })

    test("68 degrees fahrenheit is 20 degrees celsius",(done)=>{
        const far3 = 68;
        const cel3 = fahrenheitToCelsius(far3);
        const expectedCel3 = 20;
        expect(cel3).toEqual(expectedCel3);
        done();
    })

    test("Non-numeric input returns NaN",()=>{
        expect(fahrenheitToCelsius('haha')).toEqual(NaN)
    })

})