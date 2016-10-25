import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { Recipe } from './recipe';
import { Ingredient, MyTypes } from '../shared';

@Injectable()
export class RecipeService {
  recipesChanges = new EventEmitter<Recipe[]>();

  // TODO, create a sessionCacheTimeout and state
  pivotTimeout = 5000

  private recipes : Recipe[];
  private observable: Observable<any>;

  constructor(private http: Http) { }

  getRecipes(): Observable<Recipe[]>{
    //return this.recipes;

    if(!!this.recipes) {
      // if `data` is available just return it as `Observable`
      return Observable.of(this.recipes);
    } else if(this.observable) {
      // if `this.observable` is set then the request is in progress
      // return the `Observable` for the ongoing request
      return this.observable;
    } else {
      // create the request, store the `Observable` for subsequent subscribers
      this.observable = this._fetchData()
      return this.observable;
    }

    // if(!!this.recipes) {
    //   let tempObservable
    //   return new Observable<Recipe[]>(observer => {
    //     observer.next(this.recipes);
    //     observer.complete();
    //   });
    // } else {
    //   return this._fetchData()
    // }
  }

  getRecipe(id: number){
    return this.recipes[id];
  }

  deleteRecipe(recipe: Recipe){
    this.recipes.splice(this.recipes.indexOf(recipe), 1);
  }

  addRecipe(recipe: Recipe, cb?) {
    this.recipes.push(recipe);
    this.storeData().subscribe(
      (data:any) => {
        this.recipesChanges.emit(this.recipes);
      });
  }

  editRecipe(oldRecipe: Recipe, newRecipe: Recipe, cb?) {
    this.recipes[this.recipes.indexOf(oldRecipe)] = newRecipe;
    this.storeData().subscribe(
      (data:any) => {
        this.recipesChanges.emit(this.recipes);
      });
  }

  storeData() {
    const body = JSON.stringify(this.recipes);
    const headers = new Headers({
      'Content-Type': 'application/json'
    })
    return this.http.put('https://recipe-book-817c6.firebaseio.com/recipes.json', body, {
        headers: headers
      })
      .map((response: Response) => response.json())
  }

  _fetchData() {
    console.log("_fetchData")
    return this.http.get('https://recipe-book-817c6.firebaseio.com/recipes.json')
      .map((response: Response) => response.json())
      .map(response =>  {
        // when the cached data is available we don't need the `Observable` reference anymore
        this.observable = null;

        if(response.status == 400) {
          return "FAILURE";
        } else if(response.status == 200) {
          this.data = new Data(response.json());
          return this.data;
        }
        // make it shared so more than one subscriber can get the result
      })
      .share();
  }


  fetchData() {
    console.log("fetchData")
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
