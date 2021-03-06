import { OnDestroy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { FavouriteRecipeService } from './favourite-recipe.service';
import { FavouriteRecipe, RecipeService, Recipe } from '../recipes';
import { ApiService } from '../api.service';

@Component({
  selector: 'rb-favourite-list',
  templateUrl: './favourite-list.component.html',
  providers: [ ApiService ]
})
export class FavouriteListComponent implements OnInit, OnDestroy {
  private recipes: FavouriteRecipe[];
  private subscription: Subscription;
  constructor(
    public frs: FavouriteRecipeService,
    public rs: RecipeService
    ) { }

  ngOnInit() {
    // because in this componenet we can edit data and we are
    // also showing that data then we need to subscribe to
    // those changes

    this.rs.getRecipes().subscribe(
      (recipes: Recipe[]) => {
        this.recipes = this.frs.getRecipes(recipes);
      }
    );
  }

  ngOnDestroy() {
    if (!!this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
