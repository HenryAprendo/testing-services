import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { HighligthDirective } from './highligth.directive';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <h5 class="title" highligth >Valor por default</h5>
    <h5 highligth="yellow" >Valor establecido 'Yellow'</h5>
    <p highligth="blue" >Parrafo</p>
    <p>Otro parrafo</p>
  `
})
class HostComponent { }


fdescribe('HighlightDirective', () => {

  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach( async () => {
    await TestBed.configureTestingModule({
      declarations: [HostComponent, HighligthDirective ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have three highligth elements', () => {
    const elements = fixture.debugElement.queryAll(By.directive(HighligthDirective));
    // const elements = fixture.debugElement.queryAll(By.css('*[highligth]'));
    const elementsWithout = fixture.debugElement.queryAll(By.css('*:not([highligth])'));

    expect(elements.length).toEqual(3);
    expect(elementsWithout.length).toEqual(1);

  });

  it('should the elements be match with bgColor', () => {
    const elements = fixture.debugElement.queryAll(By.directive(HighligthDirective));

    expect(elements[0].nativeElement.style.backgroundColor).toEqual('gray');
    expect(elements[1].nativeElement.style.backgroundColor).toEqual('yellow');
    expect(elements[2].nativeElement.style.backgroundColor).toEqual('blue');

  });

    //obtiene la instancia de la directiva, y luego obtiene la variable defaultColor cualquiera sea su valor.
  it('should h5.title be defaultColor', () => {
    const titleDe = fixture.debugElement.query(By.css('.title'));
    const directive = titleDe.injector.get(HighligthDirective);
    expect(titleDe.nativeElement.style.backgroundColor).toEqual(directive.defaultColor);
  });


});
















