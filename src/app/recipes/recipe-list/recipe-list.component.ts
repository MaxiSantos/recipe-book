import { OnInit, Component } from '@angular/core';
import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service'

@Component({
  selector: 'rb-recipe-list',
  templateUrl: './recipe-list.component.html'
})
export class RecipeListComponent implements OnInit{
  recipes : Recipe[] = [];

  // no longer needed since we'll let the router to handle
  // this data
  //@Output() recipeSelected = new EventEmitter<Recipe>();

  constructor(
    private recipeService: RecipeService) {
  }

  ngOnInit(){
    //this.recipes = this.recipeService.getRecipes();
    this.recipeService.recipesChanges.subscribe(
      (recipes: Recipe[]) => this.recipes = recipes
    );
    this.recipeService.fetchData()
  }
}
