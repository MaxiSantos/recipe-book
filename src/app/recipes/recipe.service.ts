import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { Recipe } from './recipe';
import { Ingredient, MyTypes } from '../shared';

@Injectable()
export class RecipeService {
  recipesChanges = new EventEmitter<Recipe[]>();

  private recipes : Recipe[];

  // private recipes : Recipe[] = [
  //   new Recipe("Schnitzel", "Very tasty", "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat", "https://lotsglutenfree.files.wordpress.com/2016/06/goatscheese-and-salmon-pastries-1.jpg?w=128&h=128&crop=1", [
  //       new Ingredient('French Fires', 2, Types.UNCONTABLE),
  //       new Ingredient('Pork Meat', 1, Types.UNCONTABLE)
  //     ]),
  //   new Recipe("Summer Salad", "Okayish", "Minim veniam, quis nostrud exercitation ullamco ut aliquip ex commodo consequat", "http://s3.evcdn.com/images/block/I0-001/033/185/910-9.jpeg_/sushi-madness-edible-adventures-okc-north-10.jpeg", [
  //       new Ingredient('Pizza Fires', 5, Types.UNCONTABLE),
  //       new Ingredient('Cow Meat', 3, Types.UNCONTABLE)
  //     ])
  // ];
  constructor(private http: Http) { }

  // deprecated
  getRecipes(){
    return this.recipes;
  }

  getRecipe(id: number){
    return this.recipes[id];
  }

  deleteRecipe(recipe: Recipe){
    this.recipes.splice(this.recipes.indexOf(recipe), 1);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.storeData().subscribe();
  }

  editRecipe(oldRecipe: Recipe, newRecipe: Recipe) {
    this.recipes[this.recipes.indexOf(oldRecipe)] = newRecipe;
    this.storeData().subscribe();
  }

  storeData() {
    const body = JSON.stringify(this.recipes);
    const headers = new Headers({
      'Content-Type': 'application/json'
    })
    return this.http.put('https://recipe-book-817c6.firebaseio.com/recipes.json', body, {
      headers: headers
    })
  }

  fetchData() {
    return this.http.get('https://recipe-book-817c6.firebaseio.com/recipes.json')
      .map((response: Response) => response.json())
      .subscribe(
        (data: Recipe[]) => {
          this.recipes = data || [];
          this.recipesChanges.emit(this.recipes);
        }
      )
  }
}
