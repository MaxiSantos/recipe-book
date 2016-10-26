import { Injectable } from '@angular/core';

import { FavouriteRecipe } from '../recipes/recipe';
import { RecipeService } from '../recipes/recipe.service';
import { ApiService } from '.././api.service';

@Injectable()
export class FavouriteRecipeService {
  public recipes: FavouriteRecipe[];

  constructor(
    public api: ApiService
  ) { }

  // TODO, always calculating highest values
  // it sohuld initialize the array in a reparate method.
  //
  // PRO: it keeps updated the highest recipes details
  getRecipes(recipes) {
    var highestRatedIndex = this.getHighestRatedIndex(recipes, 2);
    this.recipes = [];
    for (var i = 0; i < highestRatedIndex.length; i++) {
      this.recipes.push(recipes[highestRatedIndex[i]]);
      this.recipes[this.recipes.length-1].position = highestRatedIndex[i];
    }
    return this.recipes;
  }

  public mapRecipesDEPRECATED(recipes) {
    var highestRatedIndex = this.getHighestRatedIndex(recipes, 2);
    this.recipes = [];
    for (var i = 0; i < highestRatedIndex.length; i++) {
      this.recipes.push(recipes[highestRatedIndex[i]]);
      this.recipes[this.recipes.length-1].position = highestRatedIndex[i];
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