function fahrenheitToCelsius(degreesFahrenheit){
    return (degreesFahrenheit -32) * 5 / 9; 
}

describe('fahrenheit-t0-celsius', () =>
{
    test('canary validates test infrastructure', () => {
        expect(true).toEqual(true);
    });

    test(' 32 degrees fahrenheit should equal 0 degrees celsius', () =>{
        expect(fahrenheitToCelsius(32)).toEqual(0);
    });

    test('212 fahrenheit is 100 degress celsius', () => {
        expect(fahrenheitToCelsius(212)).toEqual(100);
    });

    test('-40 fahrenheit is -40 degress celsius', () => {
        expect(fahrenheitToCelsius(-40)).toEqual(-40);
    });


});