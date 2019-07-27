const lib = require('../lib');
const db = require('../db');
const mail = require('../mail');

describe('absolute', () => {
    it('should return a positive number if input is positive number', () => {
        const result = lib.absolute(1);
        expect(result).toBe(1);
    });
    
    it('should return positive number if input was negative number', () => {
        const result = lib.absolute(-1);
        expect(result).toBe(1);
    });
    
    it('should return 0 if input was 0', () => {
        const result = lib.absolute(0);
        expect(result).toBe(0);
    });
});

describe('Greet', () => {
    it('should return greet message', () => {
        const result = lib.greet('Anas');
        //expect(result).toBe('Welcome Anas');
        //expect(result).toMatch(/Anas/);
        expect(result).toContain('Anas');
    });
});

describe('getCurrencies', () => {
    it('should return supported currencies', () => {
        const result = lib.getCurrencies();
        
        // Too General
        expect(result).toBeDefined();
        expect(result).not.toBeNull();

        // Too Specific
        expect(result[0]).toBe('USD');
        expect(result[1]).toBe('AUD');
        expect(result[2]).toBe('EUR');
        expect(result.length).toBe(3);

        // Proper Way
        expect(result).toContain('USD');
        expect(result).toContain('AUD');
        expect(result).toContain('EUR');

        //Ideal Way
        expect(result).toEqual(expect.arrayContaining(['EUR', 'USD', 'AUD']));
    });
});

describe('getProduct', () => {
    it('should return object with the given Id', () => {
        const result = lib.getProduct(1);
        expect(result).toEqual({id: 1, price: 10});
        expect(result).toMatchObject({id: 1, price: 10});
        expect(result).toHaveProperty('id', 1);
    });
});

describe('register User', () => {
    it('should throw if username is falsy', () => {
        const args = [null, undefined, NaN, '', 0, false];
        args.forEach(a => {
            expect(() => {lib.registerUser(a);}).toThrow();
        });
    });

    it('should return a user object if valid username', () => {
        const result = lib.registerUser('anas-aljundi');
        expect(result).toMatchObject({username: 'anas-aljundi'});
        expect(result.id).toBeGreaterThan(0);
    });
});

describe('applyDiscount', () => {
    it('should apply 10% discount if the customer has more than 10 points', () => {
        //Mock Function
        db.getCustomerSync = function(customerId) {
            console.log('Fake Function to read customer...');
            return {id: customerId, points: 20};
        }
        
        const order = {customerId: 1, totalPrice: 10};
        lib.applyDiscount(order);
        expect(order.totalPrice).toBe(9);
    });
});

describe('notifyCustomer', () => {
    it('should send an e-mail to the customer', () => {
        //Mock Function
        db.getCustomerSync = function(customerId)  {
            return { email: 'a'};
        }

        let mailSent = false;
        mail.send = function(mail, message) {
            mailSent = true;
        }
        
        lib.notifyCustomer({customerId: 1});
        expect(mailSent).toBe(true);
    });
});

//Mock Function From Jest FramWork
describe('mockFunction From Jest', () => {
    it('test mock function from jest', () => {
        /* const mockFunction = jest.fn();
        mockFunction.mockReturnValue(1);
        mockFunction.mockResolvedValue(1);
        mockFunction.mockRejectedValue(new Error ('...'));
        const result = await mockFunction();
         */
        db.getCustomerSync = jest.fn().mockReturnValue({ email: 'a'});
        mail.send  = jest.fn();

        lib.notifyCustomer({ customerId: 1});

        expect(mail.send).toHaveBeenCalled();
        expect(mail.send.mock.calls[0][0]).toBe('a');
        expect(mail.send.mock.calls[0][1]).toMatch(/order/);
    });
});