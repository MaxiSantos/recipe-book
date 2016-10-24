import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rb-recipe-start',
  template: `
    <h1>Ramdon Recipe</h1>
    <rb-random-recipe></rb-random-recipe>
  `
})
export class RecipeStartComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }
}
