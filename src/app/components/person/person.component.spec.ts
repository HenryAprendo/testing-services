
import { Component, DebugElement } from "@angular/core";
import { ComponentFixture ,TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { Person } from "src/app/models/person.model";
import { PersonComponent } from './person.component';

describe('Test PersonComponent', () => {
  let component: PersonComponent;
  let fixture: ComponentFixture<PersonComponent>;

  beforeEach( async () => {
    await TestBed.configureTestingModule({
      declarations:[ PersonComponent ]
    }).compileComponents();

    fixture = TestBed.createComponent(PersonComponent);
    component = fixture.componentInstance;
    // component.person = new Person('Nicolas', 'Molina', 28, 89, 1.4);
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should, the name be "nicolas"', () => {
    component.person = new Person('Nicolas', 'Molina', 28, 89, 1.4);
    expect(component.person.name).toEqual('Nicolas');
  });


  /**
   * Con debugElement puedo ejecutar para distintas plataformas,
   * si solo es el navegador podria obtener el fixture directamente del
   * fixture.nativeElement y desde alli el elemento dom.
   */
  it('should have <p> with "Mi altura es {{person.heigth}}" DEBUG ELEMENT', () =>{
    component.person = new Person('Camila', 'Ruis', 28, 89, 1.4);

    const personDebug: DebugElement = fixture.debugElement;
    const pDebug: DebugElement = personDebug.query(By.css('p'));
    const pElement: HTMLElement = pDebug.nativeElement;

    fixture.detectChanges();

    expect(pElement?.textContent).toContain(component.person.heigth);
  });

  // it('should have <p> with "Soy un parrafo" NATIVE ELEMENT ', () =>{
  //   const personElement: HTMLElement = fixture.nativeElement;
  //   const p = personElement.querySelector('p');
  //   expect(p?.textContent).toEqual('Soy un parrafo');
  // });

  it('should have <h3> with "Hola, {person?.heigth}" ', () => {
    component.person = new Person('Camila', 'Ruis', 28, 89, 1.4);

    const element: DebugElement = fixture.debugElement;
    const h3Debug: DebugElement = element.query(By.css('h3'));
    const h3: HTMLElement = h3Debug.nativeElement;

    fixture.detectChanges();

    expect(h3.textContent).toContain(component.person.name);
  });

  it('should display a text "overheigth" when call calcIMC', () => {
    component.person = new Person('Sara','Bonilla', 45, 70, 1.65);
    const msgExpect = 'overheigth';

    const buttonEl = fixture.debugElement.query(By.css('button.btn-imc')).nativeElement;

    component.calcIMC();
    fixture.detectChanges();

    expect(buttonEl.textContent).toContain(msgExpect);

  });

  it('should display a text "overheigth" when do click in the button', () => {
    component.person = new Person('Sara','Bonilla', 45, 70, 1.65);
    const msgExpect = 'overheigth';

    const buttonDe: DebugElement = fixture.debugElement.query(By.css('button.btn-imc'));
    const buttonEl = buttonDe.nativeElement;

    buttonDe.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(buttonEl.textContent).toContain(msgExpect);

  });

  it('should display a text "overheigth level 1" when do click to the button', () => {
    component.person = new Person('Camilo', 'Daza', 50, 75, 1.65);
    const expectMsg = 'overheigth level 1';

    const buttonDe: DebugElement = fixture.debugElement.query(By.css('button.btn-imc'));
    const buttonEl = buttonDe.nativeElement;

    buttonDe.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(buttonEl.textContent).toContain(expectMsg);

  });

  it('should raise selected event when do click', () => {
    const expectPerson = new Person('Lola', 'Perez', 40, 68, 1.89);
    component.person = expectPerson;

    let selectedPerson: Person | undefined;

    const buttonDe: DebugElement = fixture.debugElement.query(By.css('button.btn-choose'));

    component.onSelected
      .subscribe( person => {
        selectedPerson = person;
      });

    buttonDe.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(selectedPerson).toEqual(expectPerson);

  });

});


/**
 * Pruebas aisladas a un componente:
 * Teniendo en cuenta que PersonComponent es renderizado en el People component.
 *
 * 1. Creamos un componente host e implememtamos a PersonComponent
 */

@Component({
  selector: 'app-host',
  template: `<app-person [person]="person" (onSelected)="onSelected($event)"></app-person>`
})
class HostComponent {

  person = new Person('Lucas','Moura', 35, 60, 1.70);

  selectedPerson: Person | undefined;

  constructor(){}

  onSelected(person: Person){
    this.selectedPerson = person;
  }

}

describe('PersonComponent from HostComponent', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HostComponent, PersonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display person name', () => {

    const personExpect = component.person.name;

    const elementDe: DebugElement = fixture.debugElement.query(By.css('app-person h3'));
    const h3El = elementDe.nativeElement;

    fixture.detectChanges();
    expect(h3El.textContent).toContain(personExpect);

  });


  it('should raise selected event when clicked', () => {

    const btnDe: DebugElement = fixture.debugElement.query(By.css('app-person .btn-choose'));

    btnDe.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.selectedPerson).toEqual(component.person);

  });

});


























