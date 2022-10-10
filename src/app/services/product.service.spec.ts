import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { ProductsService } from './product.service';
import { Product } from "../models/product.model";
import { generateManyProducts } from "../models/product.mock";
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
      httpControler.verify();

    });
  });

});


















