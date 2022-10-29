import { TestBed, ComponentFixture, fakeAsync, tick } from "@angular/core/testing";
import { ProductsComponent } from "./products.component";
import { ProductComponent } from './../product/product.component';
import { ProductsService } from './../../services/product.service';
import { generateManyProducts } from './../../models/product.mock';
import { of, defer } from "rxjs";
import { ValueService } from '././../../services/value.service';
import { By } from "@angular/platform-browser";

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productServices: jasmine.SpyObj<ProductsService>;
  let valueServices: jasmine.SpyObj<ValueService>;

  beforeEach( async () => {
    const productServicesSpy = jasmine.createSpyObj('ProductService', ['getAll']);
    const valueServicesSpy = jasmine.createSpyObj('ValueService', ['getPromiseValue']);

    await TestBed.configureTestingModule({
      declarations: [ ProductsComponent, ProductComponent ],
      providers: [
        {provide: ProductsService, useValue: productServicesSpy },
        {provide: ValueService, useValue: valueServicesSpy}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    productServices = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>

    const productMock = generateManyProducts(3);
    productServices.getAll.and.returnValue(of(productMock));  //getAll es ejecutado en el ngOnInit

    valueServices = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>

    fixture.detectChanges();  // aqui se ejecuta el ngOnInit
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should to call getAll', () => {
    expect(productServices.getAll).toHaveBeenCalled();
  });

  describe('Test for getAllProducts', () => {

    it('should return a products list', () => {
      const productMock = generateManyProducts(10);
      productServices.getAll.and.returnValue(of(productMock));
      const countPrev = component.products.length;

      component.getAllProducts();
      fixture.detectChanges();

      expect(component.products.length).toEqual(productMock.length + countPrev);

    });


    /**
     * fakeAsync y tick : defer
     * En conjunto me permiten detectar cambios de estado,
     * deteniendo la ejecucion de una promesa con defer y
     * activando su ejecucion con tick, todo estar dentro de
     * un contexto fake async.
     */

    it('should change the status "loading" => "success"', fakeAsync( () => {

      const productMock = generateManyProducts(10);
      productServices.getAll.and.returnValue(defer(() => Promise.resolve(productMock)));

      component.getAllProducts();
      expect(component.status).toEqual('loading');

      tick();

      expect(component.status).toEqual('success');

    }));


    it('should change the status "loading" => "error"', fakeAsync( () => {

      const productMock = generateManyProducts(10);
      productServices.getAll.and.returnValue(defer(() => Promise.reject('error')));

      component.getAllProducts();
      expect(component.status).toEqual('loading');

      tick(4000);     //ejecuta observables, promesas, setTime

      expect(component.status).toEqual('error');

    }));




  });

  describe('Test for callPromises ', () => {
    it('should return a promises with async - await', async () => {

      const mockPromise = 'test';

      valueServices.getPromiseValue.and.returnValue(Promise.resolve(mockPromise));

      await component.callPromise();
      fixture.detectChanges();

      expect(component.rta).toEqual(mockPromise);
      expect(valueServices.getPromiseValue).toHaveBeenCalled();

    });

    it('should return a promises with fake-async', fakeAsync(() => {

      const mockPromise = 'test';
      valueServices.getPromiseValue.and.returnValue(Promise.resolve(mockPromise));

      const btnDe = fixture.debugElement.query(By.css('.btn-load'));
      btnDe.triggerEventHandler('click', null);

      tick();

      fixture.detectChanges();

      expect(component.rta).toEqual(mockPromise);
      expect(valueServices.getPromiseValue).toHaveBeenCalled();

    }));


    it('should show "mock test" in <p> when button clicked', fakeAsync(
      () => {
        const mockData = 'mock test';
        valueServices.getPromiseValue.and.returnValue(Promise.resolve(mockData));

        const btnDe = fixture.debugElement.query(By.css('.btn-promise'));
        btnDe.triggerEventHandler('click', null);

        tick();

        fixture.detectChanges();
        const rtaDe = fixture.debugElement.query(By.css('.rta'));

        expect(rtaDe.nativeElement.textContent).toEqual(mockData);
        expect(valueServices.getPromiseValue).toHaveBeenCalled();
        expect(component.rta).toEqual(mockData);

      }
    ));

  });

});










function tink() {
  throw new Error("Function not implemented.");
}

