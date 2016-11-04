import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Recipe, FavouriteRecipe } from './recipe';
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

        // if we make randomRecipe to be a reference then when we change a value in
        // local memory that change will be reflected on the view. And that change should
        // be reflected on view only when it save it to the backend and backend returns a 200

        //this.randomRecipe = recipes[random];

        // by making a new object then we unbind the local data from the components that are
        // using this data

        // this is not working, just on setInterval
        //this.randomRecipe = Object.create(recipes[0]); // this is not working

        // this is too long
        //this.randomRecipe = new Recipe('name','short desciption','long desciption','',null,150);

        // this just work
        //this.randomRecipe = <Recipe> JSON.parse(JSON.stringify(recipes[random]));

        const randomRecipe = <Recipe> JSON.parse(JSON.stringify(recipes[random]));
        randomRecipe.position = random;
        return randomRecipe;
      });
  }

  getUpdatedRandomRecipe(recipe): Recipe{
    const randomRecipe = this.rs.getRecipe(recipe.position);
    return <Recipe> JSON.parse(JSON.stringify(randomRecipe));
  }
}
