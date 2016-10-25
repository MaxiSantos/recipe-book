import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rb-recipe-start',
  template: `
    <rb-random-recipe></rb-random-recipe>
  `
})
export class RecipeStartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('recipe start executed');
  }
}
