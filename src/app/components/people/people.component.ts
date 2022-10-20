import { Component, OnInit } from '@angular/core';
import { Person } from './../../models/person.model';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {

  person:Person = new Person('Willian', 'Sanchez', 40, 55, 1.70);

  constructor() { }

  ngOnInit(): void {
  }

}
