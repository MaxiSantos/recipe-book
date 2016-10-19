import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { Recipe } from './recipe';
import { Ingredient, MyTypes } from '../shared';

@Injectable()
export class RecipeService {
  recipesChanges = new EventEmitter<Recipe[]>();

  private recipes : Recipe[];
  constructor(private http: Http) { }

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
    console.log('calling fetchData from recipe.service')
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
