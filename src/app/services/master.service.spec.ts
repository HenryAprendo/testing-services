import { TestBed } from '@angular/core/testing';

import { MasterService } from './master.service';
import { ValueService } from './value.service';

 /* Test de servicio con inyección de dependencia */

 describe('MasterService using context TesBed for angular', () => {

  let masterService: MasterService;
  let valueServiceSpy: jasmine.SpyObj<ValueService>;

  beforeEach(() => {
    const spy: jasmine.SpyObj<ValueService> = jasmine.createSpyObj('ValueService', ['getValue']);

    TestBed.configureTestingModule({
      providers: [
        MasterService,
        { provide: ValueService, useValue: spy }
      ]
    });

    masterService = TestBed.inject(MasterService);
    valueServiceSpy = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>;
  });

  it('should be created', () => {
    expect(masterService).toBeTruthy();
  });

  it('should call "getValue" from ValueService', () => {

    valueServiceSpy.getValue.and.returnValue('fake value');
    masterService.getValue();

    expect(valueServiceSpy.getValue).toHaveBeenCalled();
    expect(valueServiceSpy.getValue).toHaveBeenCalledTimes(1);
  });

 });


// describe('MasterService tradition', () => {

//   // let masterService: MasterService

//   // /* Caso 1: Inyectando el servicio real, no recomendable sobre todo cuando están conectados a una api*/
//   // it('should return "my value" from the real service', () => {
//   //   const valueService = new ValueService();
//   //   const masterService = new MasterService(valueService);
//   //   expect(masterService.getValue()).toBe('my value')
//   // });

//   /* Caso 2: Inyectando el servicio fake, lo que implicaria crear un clone del servicio de inyección de dependencia, en donde solamente tomamos
//    la firma del método y podriamos retornar directamente un valor fake de forma emulada, porque nos interesa que ValueService funcione sino MasterService.
//    No es recomendable su uso porque esto implicaria un nuevo archivo, no ayuda a un código mantenible etc*/

//   // it('should return "fake value" from the fake service', () => {
//      // const fakeValueService = new FakeValueService();
//      // const masterService = new MasterService(fakeValueService as unknown as ValueService);
//      // expect(masterService.getValue()).toBe('fake value')
//   // });

//    /*Caso 3: Utilizando un objeto literal, con los métodos del servicio que se quiere emular */
//   // it('should return "other value" from the fake object', () => {
//   //   const fake = { getValue: () => 'fake from obj'};
//   //   const masterService = new MasterService(fake as ValueService);
//   //   expect(masterService.getValue()).toBe('fake from obj');
//   // });

  // it('should call to "getValue" from ValueService', () => {
  //   //Mock spy forma tradicional sin angular
  //   const valueServiceSpy: jasmine.SpyObj<ValueService> = jasmine.createSpyObj('ValueService',['getValue']);
  //   valueServiceSpy.getValue.and.returnValue('fake value');

  //   const masterService = new MasterService(valueServiceSpy);

  //   expect(masterService.getValue()).toBe('fake value');
  //   expect(valueServiceSpy.getValue).toHaveBeenCalled();
  //   expect(valueServiceSpy.getValue).toHaveBeenCalledTimes(1);
  // });

// });

/**
 * Los mocking son objetos simulados que imitan el comportamiento de un objeto real de forma controlada.
 */


















