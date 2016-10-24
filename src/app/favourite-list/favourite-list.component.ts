import { OnDestroy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FavouriteRecipeService } from './';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe, FavouriteRecipe } from '../recipes/recipe';

import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'rb-favourite-list',
  templateUrl: './favourite-list.component.html'
})
export class FavouriteListComponent implements OnInit, OnDestroy {
  private recipes: FavouriteRecipe[];
  private subscription: Subscription;
  constructor(
    public frs: FavouriteRecipeService,
    public rs: RecipeService
    ) { }

  ngOnInit() {
    this.subscription = this.rs.recipesChanges.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = this.frs.getRecipes(recipes);
      }
    );
    this.rs.fetchData();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
