import { Component } from '@angular/core';

import { Recipe } from './recipe'
import { ApiService } from '../api.service';

@Component({
  selector: 'rb-recipes',
  templateUrl: './recipes.component.html',
  providers: [ ApiService ]
})

export class RecipesComponent {
  selectedLocalRecipe : Recipe;
  constructor() { }
}
