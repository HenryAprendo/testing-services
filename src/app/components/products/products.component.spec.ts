import { TestBed, ComponentFixture, fakeAsync, tick } from "@angular/core/testing";
import { ProductsComponent } from "./products.component";
import { ProductComponent } from './../product/product.component';
import { ProductsService } from './../../services/product.service';
import { generateManyProducts } from './../../models/product.mock';
import { of, defer } from "rxjs";

fdescribe('ProductComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productServices: jasmine.SpyObj<ProductsService>;

  beforeEach( async () => {
    const productServicesSpy = jasmine.createSpyObj('ProductService', ['getAll']);

    await TestBed.configureTestingModule({
      declarations: [ ProductsComponent, ProductComponent ],
      providers: [
        {provide: ProductsService, useValue: productServicesSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    productServices = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>

    const productMock = generateManyProducts(3);
    productServices.getAll.and.returnValue(of(productMock));  //getAll es ejecutado en el ngOnInit

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

});










