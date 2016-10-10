import { Component, DoCheck } from '@angular/core';
import {Recipe} from './recipe'

@Component({
  selector: 'rb-recipes',
  templateUrl: './recipes.component.html'
})
export class RecipesComponent implements DoCheck {
  selectedLocalRecipe : Recipe;
  constructor() { }

  ngDoCheck(){
    console.log(this.selectedLocalRecipe)
  }
}
