import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe';
import { RecipeService } from '../recipes/recipe.service';

@Injectable()
export class FavouriteRecipeService {
  private recipes: Recipe[];

  constructor(public rs: RecipeService) { }

  // TODO, always calculating highest values
  // it sohuld initialize the array in a reparate method.
  //
  // PRO: it keeps updated the highest recipes details
  getRecipes(recipes) {
    var highestRated = this.getHighestRatedIndex(recipes, 2);
    this.recipes = [];
    for (var i = 0; i < highestRated.length; i++) {
      this.recipes.push(recipes[highestRated[i]]);
    }
    return this.recipes;
  }

  // this should go into a utility class/service
  private getHighestRatedIndex(inp, count) {
    var outp = [];
    for (var i = 0; i < inp.length; i++) {
        outp.push(i); // add index to output array
        if (outp.length > count) {
          // descending sort the output array
          outp.sort(function(a, b) { return inp[b]['rating'] - inp[a]['rating']; });
          outp.pop(); // remove the last index (index of smallest element in output array)
        }
    }
    return outp;
  }
}