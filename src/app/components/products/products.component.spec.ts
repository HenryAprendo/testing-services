import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed, ComponentFixture } from "@angular/core/testing";
import { ProductsComponent } from "./products.component";

fdescribe('ProductComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  beforeEach( async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
