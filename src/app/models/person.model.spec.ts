import { Person } from './person.model';

describe('Test for Person', () => {
  let person: Person;

  beforeEach(() => {
    person = new Person('Clara','Marquez',38, 40, 1.65);
  });

  it('test for attr', () => {
    expect(person.name).toEqual('Clara');
    expect(person.lastname).toEqual('Marquez');
  });

  describe('Test for calcImc', () => {
    it('should return a string "down"', () => {
      person.weigth = 40;
      person.heigth = 1.65;

      const rta = person.calcIMC();

      expect(rta).toEqual('down');
    });

    it('should return a string "normal"', () => {
      person.weigth = 58;
      person.heigth = 1.65;

      const rta = person.calcIMC();

      expect(rta).toEqual('normal');
    });

    it('should return a string "overheigth"', () => {
      person.weigth = 70;
      person.heigth = 1.65;

      const rta = person.calcIMC();

      expect(rta).toEqual('overheigth');
    });

    it('should return a string "overheigth level 1"', () => {
      person.weigth = 75;
      person.heigth = 1.65;

      const rta = person.calcIMC();

      expect(rta).toEqual('overheigth level 1');
    });

    it('should return a string "not found"', () => {
      person.weigth = -48;
      person.heigth = 1.65;

      const rta = person.calcIMC();

      expect(rta).toEqual('not found');
    });

  })

});







