import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { ProductsService } from './product.service';
import { CreateProductDTO, Product, UpdateProductDTO } from "../models/product.model";
import { generateManyProducts, generateOneProduct } from "../models/product.mock";
import { environment } from './../../environments/environment';
import { HttpStatusCode, HTTP_INTERCEPTORS } from "@angular/common/http";
import { TokenInterceptor } from "../interceptors/token.interceptor";
import { TokenService } from "./token.service";


describe('ProductService', () => {

  let productsService: ProductsService
  let httpControler: HttpTestingController
  let tokenService: TokenService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ProductsService,
        TokenService,
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
      ]
    });

    productsService = TestBed.inject(ProductsService);
    httpControler = TestBed.inject(HttpTestingController);
    tokenService = TestBed.inject(TokenService);
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
      spyOn(tokenService, 'getToken').and.returnValue('123');

      //2.Ejecución y prueba del método
      productsService.getAllSimple()
      .subscribe( data => {
        expect(data.length).toEqual(mockData.length);
        doneFn()
      });

      //3.Configuración del controlador que intercepta la petición y adiciona el mock de retorno
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpControler.expectOne(url);
      const headers = req.request.headers;
      expect(headers.get('Authorization')).toEqual(`Bearer 123`);
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

  describe('Test for create', () => {
    it('should return a new product', (doneFn) => {
      const mockData = generateOneProduct();

      const dto: CreateProductDTO = {
        title: 'My new product',
        price: 500,
        images: ['img'],
        description: 'New product for my',
        categoryId: 12
      };

      productsService.create({...dto})       //{..dto} protege de mutaciones el dto, al pasar solo una referencia del dto
      .subscribe( data => {
        expect(data).toEqual(mockData);
        doneFn();
      });

      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpControler.expectOne(url);
      req.flush(mockData);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(dto);  //evita modificaciones de los dto en el método

    });
  });

  describe('Test for update', () => {
    it('should update a product', (doneFn) => {
      const mockData = generateOneProduct();

      const dto: UpdateProductDTO = {
        title: 'My new product'
      };

      const productId = '1';

      productsService.update(productId,{...dto})
      .subscribe( data => {
        expect(data).toEqual(mockData);
        doneFn();
      });

      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpControler.expectOne(url);
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(dto);
      req.flush(mockData);
    });


  });

  describe('Test for delete', () => {
    it('should delete a product', (doneFn) => {
      const mockData = true;
      const productId = '1';

      productsService.delete(productId)
      .subscribe( data => {
        expect(data).toEqual(mockData);
        doneFn();
      });

      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpControler.expectOne(url);
      expect(req.request.method).toEqual('DELETE');
      req.flush(mockData);
    });
  });

  describe('Test for getOne', () => {
    it('should return a product', (doneFn) => {
      const mockData = generateOneProduct();
      const productId = '1';

      productsService.getOne(productId)
      .subscribe( data => {
        expect(data).toEqual(mockData);
        doneFn();
      });

      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpControler.expectOne(url);
      expect(req.request.method).toEqual('GET');
      req.flush(mockData);
    });

    it('should return the right msg when the status code is 404', (doneFn) => {
      const productId = '1';
      const msgError = '404 message';
      const mockError = {
        status: HttpStatusCode.NotFound,
        statusText: msgError
      }

      productsService.getOne(productId)
      .subscribe({
        error: (error) => {
          expect(error).toEqual('El producto no existe');
          doneFn();
        }
      });

      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpControler.expectOne(url);
      expect(req.request.method).toEqual('GET');
      req.flush(msgError,mockError);
    });

    it('should return the right msg when the status code is 401', (doneFn) => {
      const productId = '1';
      const msgError = '401 message';
      const mockError = {
        status: HttpStatusCode.Unauthorized,
        statusText: msgError
      }

      productsService.getOne(productId)
      .subscribe({
        error: (error) => {
          expect(error).toEqual('No tienes permitido el acceso');
          doneFn();
        }
      });

      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpControler.expectOne(url);
      expect(req.request.method).toEqual('GET');
      req.flush(msgError,mockError);
    });

  });

});

















