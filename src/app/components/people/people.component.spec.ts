import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleComponent } from './people.component';
import { PersonComponent } from './../person/person.component';
import { Person } from './../../models/person.model';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('PeopleComponent', () => {
  let component: PeopleComponent;
  let fixture: ComponentFixture<PeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeopleComponent, PersonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a list app-person components', () => {
    component.people = [
      new Person('Willian', 'Sanchez', 40, 55, 1.70),
      new Person('Valentina', 'Cardona', 40, 70, 1.80),
      new Person('Willian', 'Sanchez', 40, 55, 1.70),
      new Person('Valentina', 'Cardona', 40, 70, 1.80)
    ];

    fixture.detectChanges();

    const elementsDe = fixture.debugElement.queryAll(By.css('app-person'));   //obtiene todos los app-person renderizados
    expect(elementsDe.length).toEqual(4);

  });

  it('should render a name of person', () => {

    const buttonDe = fixture.debugElement.query(By.css('app-person .btn-choose'));
    buttonDe.triggerEventHandler('click', null);

    fixture.detectChanges();

    const expertPerson = component.selectedPerson?.name;
    const elementDe = fixture.debugElement.query(By.css('.selectedPerson ul > li'));
    const nameEl = elementDe.nativeElement;

    expect(component.selectedPerson).toEqual(component.people[0]);
    expect(nameEl.textContent).toContain(expertPerson);

  });

});











