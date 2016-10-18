import { OnInit, Component } from '@angular/core';
import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service'

@Component({
  selector: 'rb-recipe-list',
  templateUrl: './recipe-list.component.html'
})
export class RecipeListComponent implements OnInit{
  recipes : Recipe[] = [];

  constructor(
    private recipeService: RecipeService) {
  }

  ngOnInit(){
    this.recipeService.recipesChanges.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
    this.recipeService.fetchData()
  }
}
