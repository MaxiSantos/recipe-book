import { OnDestroy, Component, OnInit, OnChanges } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { ActivatedRoute, Router } from '@angular/router';

import { Recipe } from './recipe';

import { RecipeRandomService } from './recipe-random.service';
import { RecipeService } from './recipe.service';


@Component({
  selector: 'rb-random-recipe',
  templateUrl: './random-recipe.component.html',
  providers: [RecipeRandomService]
})
export class RandomRecipeComponent implements OnInit, OnChanges, OnDestroy {
  randomRecipe: Recipe;
  subscription: Subscription;

  constructor(
    private rdms: RecipeRandomService,
    private rs: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.rdms.getRandom().subscribe(
      (recipe: Recipe) => {
        this.randomRecipe = recipe;
        this.subscription = this.rs.recipesChanges$.subscribe(
          (recipe: Recipe) => {
            this.randomRecipe = this.rdms.getUpdatedRandomRecipe(recipe)
          }
        )
      }
    );
  }

  ngOnChanges(){
    console.log("on random changes");
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }
}
