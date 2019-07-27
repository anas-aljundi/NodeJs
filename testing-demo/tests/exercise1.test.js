const lib = require('../exercise1');

describe('FizzBuzz', () => {
    it('should throw if the input is not a number', () => {
        expect(() => { lib.fizzBuzz('a'); }).toThrow();
        expect(() => { lib.fizzBuzz(null); }).toThrow();
        expect(() => { lib.fizzBuzz(undefined); }).toThrow();
        expect(() => { lib.fizzBuzz({}); }).toThrow();
    });

    it('should return fizzBuzz if the input is divisible by 3 and 5', () => {
        const result = lib.fizzBuzz(15);
        expect(result).toBe('FizzBuzz');
    });

    it('should return Fizz if the input is divisible by 3 just', () => {
        const result = lib.fizzBuzz(9);
        expect(result).toBe('Fizz');
    });

    it('should return Buzz if the number is divisible by 5 just', () => {
        const result = lib.fizzBuzz(25);
        expect(result).toBe('Buzz');
    });

    it('should return the same input if the input is not divisible by 3 nor 5', () => {
        const result = lib.fizzBuzz(7);
        expect(result).toBe(7);
    });
});