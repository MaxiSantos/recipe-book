import { OnInit, Component, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service'

import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'rb-recipe-list',
  templateUrl: './recipe-list.component.html'
})
export class RecipeListComponent implements OnInit, OnDestroy{
  recipes : Recipe[] = [];
  private subscription : Subscription;

  constructor(
    private rs: RecipeService) {
  }

  ngOnInit(){
    this.subscription = this.rs.getRecipes().subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
    //this.recipeService.fetchData()
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
