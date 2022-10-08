import { TestBed } from '@angular/core/testing';
import { ValueService } from './value.service';

describe('ValueService', () => {
  let service: ValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValueService]
    });
    service = TestBed.inject(ValueService);
    // service = new ValueService() sin el contexto de angular
  });

  it('should to created', () => {
    expect(service).toBeTruthy();
  });

  describe('Test for getValue', () => {
    it('should return "my value" ', () => {
      expect(service.getValue()).toBe('my value');
    })
  });

  describe('Test for setValue', () => {
    it('should to setting a new value', () => {
      service.setValue('new value');
      expect(service.getValue()).toBe('new value');
    })
  });

  describe('Test for getPromiseValue', () => {

    it('should return "promise value" from  promise with then', (doneFn:DoneFn) => {
      service.getPromiseValue().then((value) => {
        expect(value).toBe('promise value')
        doneFn();   //Indica que aqui finaliza la prueba
      })
    });

    it('should return "promise value" from  promise using async', async () => {
      let rta = await service.getPromiseValue();
      expect(rta).toBe('promise value');
    });

  });

  describe('Test for getObservableValue', () => {

    it('should return "observable value" from a observable', (doneFn:DoneFn) => {
      service.getObservableValue().subscribe( value => {
        expect(value).toBe('observable value');
        doneFn();
      })
    });

  });


});








