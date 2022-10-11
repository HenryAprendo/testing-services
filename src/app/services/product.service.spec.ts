import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { ProductsService } from './product.service';
import { Product } from "../models/product.model";
import { generateManyProducts, generateOneProduct } from "../models/product.mock";
import { environment } from './../../environments/environment';


describe('ProductService', () => {

  let productsService: ProductsService
  let httpControler: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService]
    });

    productsService = TestBed.inject(ProductsService);
    httpControler = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpControler.verify();
  });

  it('should be create', () => {
    expect(productsService).toBeTruthy();
  });


  describe('test for getAllSimple', () => {
    it('should return a products list', (doneFn) => {

      //1.Mock de retorno
      const mockData: Product[] = generateManyProducts();

      //2.Ejecución y prueba del método
      productsService.getAllSimple()
      .subscribe( data => {
        expect(data.length).toEqual(mockData.length);
        doneFn()
      });

      //3.Configuración del controlador que intercepta la petición y adiciona el mock de retorno
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpControler.expectOne(url);
      req.flush(mockData);
    });
  });

  describe('test for getAll', () => {
    it('should return a products list', (doneFn) => {

      //1.Mock de retorno
      const mockData: Product[] = generateManyProducts(3);

      //2.Ejecución y prueba del método
      productsService.getAll()
      .subscribe( data => {
        expect(data.length).toEqual(mockData.length);
        doneFn()
      });

      //3.Configuración del controlador que intercepta la petición y adiciona el mock de retorno
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpControler.expectOne(url);
      req.flush(mockData);

    });

    it('should return a products list with taxes', (doneFn) => {

      //1.Mock de retorno
      const mockData: Product[] = [
        {
          ...generateOneProduct(),
          price: 100 //.19 x 100 = 19
        },
        {
          ...generateOneProduct(),
          price: 200 //.19 x 200 = 38
        },
        {
          ...generateOneProduct(),
          price: 0 //.19 x 200 = 38
        },
        {
          ...generateOneProduct(),
          price: -100 //.19 x 200 = 38
        }
      ]

      //2.Ejecución y prueba del método
      productsService.getAll()
      .subscribe( data => {
        expect(data[0].taxes).toEqual(19);
        expect(data[1].taxes).toEqual(38);
        expect(data[2].taxes).toEqual(0);
        expect(data[2].taxes).toEqual(0);
        doneFn()
      });

      //3.Configuración del controlador que intercepta la petición y adiciona el mock de retorno
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpControler.expectOne(url);
      req.flush(mockData);
    });

    it('should send limit and offset', (doneFn) => {

      //1.Mock de retorno
      const mockData: Product[] = generateManyProducts(3);
      const limit = 10;
      const offset = 10;

      //2.Ejecución y prueba del método
      productsService.getAll(limit,offset)
      .subscribe( data => {
        expect(data.length).toEqual(mockData.length);
        doneFn()
      });

      //3.Configuración del controlador que intercepta la petición y adiciona el mock de retorno
      const url = `${environment.API_URL}/api/v1/products?limit=${limit}&offset=${offset}`;
      const req = httpControler.expectOne(url);
      req.flush(mockData);
      const params = req.request.params;
      expect(params.get('limit')).toEqual(`${limit}`);
      expect(params.get('offset')).toEqual(`${offset}`);

    });
  });

});


















