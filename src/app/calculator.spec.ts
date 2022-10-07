import { Calculator } from './calculator';


describe('Test for Calculator', () => {

  describe('Test for multiply', () => {

    it('Shoud return a nine', () => {
      //arrange
      const calculator = new Calculator();

      //act
      const rta = calculator.multiply(3,3)

      //assertion
      expect(rta).toEqual(9);
    });

    it('Shoud return a four', () => {
      const calculator = new Calculator();

      const rta = calculator.multiply(4,1)
      expect(rta).toEqual(4);
    });

  })


  describe('Test for divide', () => {

    it('Should return a some numbers', () => {
      const calculator = new Calculator();

      expect(calculator.divide(6,3)).toEqual(2);
      expect(calculator.divide(5,2)).toEqual(2.5);
    });

    it('Should return null', () => {
      const calculator = new Calculator();

      const rta = calculator.divide(5,0);
      expect(rta).toBeNull();

    });

    // matchers
    it('tests matchers', () => {

      let name = 'henry';
      let name2;

      //test de variables definidas y no definidas
      expect(name).toBeDefined();
      expect(name2).toBeUndefined();

      expect(1 + 3 === 4).toBeTruthy();
      expect(1 + 1 === 3).toBeFalsy();

      expect(5).toBeLessThan(10);
      expect(20).toBeGreaterThan(10);

      expect('123456').toMatch(/123/);
      expect(['apples', 'oranges', 'pears']).toContain('oranges');

    });

  })


})




















