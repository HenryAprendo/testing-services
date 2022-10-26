import { Component, OnInit } from '@angular/core';
import { Person } from './../../models/person.model';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {

  people: Person[] = [
    new Person('Willian', 'Sanchez', 40, 55, 1.70),
    new Person('Valentina', 'Cardona', 40, 70, 1.80)
  ];

  selectedPerson: Person | null = null;

  constructor() { }

  ngOnInit(): void {
  }

  choose(person:Person) {
    this.selectedPerson = person;
  }

}
