import { Component, OnInit } from '@angular/core';

import { ApiService } from '../api.service';

@Component({
  selector: 'rb-recipe-start',
  template: `
    <rb-cheef></rb-cheef>
    <rb-random-recipe></rb-random-recipe>
  `,
  providers: [ ApiService ]
})
export class RecipeStartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}
