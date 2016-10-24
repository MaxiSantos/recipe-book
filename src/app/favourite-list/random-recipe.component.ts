import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { ActivatedRoute, Router } from '@angular/router';

import { Recipe } from '../recipes/';
import { RecipeService } from '../recipes';

@Component({
  selector: 'rb-random-recipe',
  templateUrl: './random-recipe.component.html'
})
export class RandomRecipeComponent implements OnInit {
  randomRecipe: Recipe;
  subscription: Subscription;

  constructor(
    private rs: RecipeService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
    var allRecipes = this.rs.getRecipes();
    if(!!allRecipes) {
      var min = 0,
        max = allRecipes.length - 1,
        random = Math.floor(Math.random() * (max - min + 1)) + min;
      this.randomRecipe = allRecipes[random];
    } else {
      var subscription = this.rs.recipesChanges.subscribe((recipes: Recipe[]) => {
        var min = 0,
          max = recipes.length - 1,
          random = Math.floor(Math.random() * (max - min + 1)) + min;
        this.randomRecipe = recipes[random];
      })
    }
  }

}
