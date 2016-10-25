import { OnDestroy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FavouriteRecipeService } from './favourite-recipe.service';

import { FavouriteRecipe, RecipeService, Recipe } from '../recipes';
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
    // because in this componenet we can edit data and we are
    // also showing that data then we need to subscribe to
    // those changes

    // this.subscription = this.rs.recipesChanges.subscribe(
    //   (recipes: Recipe[]) => {
    //     this.recipes = this.frs.getRecipes(recipes);
    //   }
    // );

    console.log("calling this.rs.getRecipes from favourite-list.component.ts")
    this.rs.getRecipes().subscribe(
      (recipes: Recipe[]) => {
        this.recipes = this.frs.getRecipes(recipes);
      }
    );
    //this.rs.fetchData();
  }

  ngOnDestroy() {
    if (!!this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
