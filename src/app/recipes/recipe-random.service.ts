import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Recipe } from './recipe';
import { RecipeService } from './recipe.service';

@Injectable()
export class RecipeRandomService {

  constructor(
    private rs: RecipeService
  ) { }

  // NOTE: we are doing a get recipe just to test this
  // scenario where we need to call other service nad this
  // service is a commin service used in many places
  getRandom(): Observable<any> {
    return this.rs.getRecipes()
      .map((recipes: Recipe[]) => {
        var min = 0,
          max = recipes.length - 1,
          random = Math.floor(Math.random() * (max - min + 1)) + min;

        return <Recipe> JSON.parse(JSON.stringify(recipes[random]));
      });
  }
}
