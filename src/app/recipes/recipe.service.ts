import { ChangeDetectorRef, Injectable, Inject, EventEmitter } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/Rx';

import { Recipe } from './recipe';
import { Ingredient, MyTypes } from '../shared';
import { ApiService } from '../api.service';
import { IApiConfig } from '../interface-api-config';
import { IApiService } from '../interface-service';

@Injectable()
export class RecipeService implements IApiService{
  recipesChanges = new EventEmitter<Recipe[]>();

  // TODO, create a sessionCacheTimeout and state
  pivotTimeout = 5000

  private recipes : Recipe[];
  observable: Observable<any>;

  private recipesChangesSource = new Subject<Recipe>();
  recipesChanges$ = this.recipesChangesSource.asObservable();

  private recipeChangeSource = new Subject<Recipe>();
  recipeChange$ = this.recipeChangeSource.asObservable();


  constructor(
    private http: Http,
    public api: ApiService
    //private _cdRef: ChangeDetectorRef
  ) { }

  // TODO,
  // -- create interface for all services: must have an
  //   observable
  // -- create a serviceConfig interface: must have url, service
  //   instance and datakey: string
  // -- start using new getRecipe
  // -- refator in all places
  // -- check if singleton is not screwing things up

  getRecipes(force?): Observable<Recipe[]> {
    let url = 'https://recipe-book-817c6.firebaseio.com/recipes.json';
    //let config = new IApiConfig(url, this, 'recipes', 1);
    var config = {
      url: url,
      service: this,
      sourceKey: 'recipes'
    };
    if (force) {
      config['forceCall'] = force;
    }
    return this.api.getData(config);
    //this._cdRef.markForCheck();
  }

  announceChanges(recipe: Recipe){
    this.recipesChangesSource.next(recipe);
  }

  announceChange(recipe: Recipe){
    this.recipesChangesSource.next(recipe);
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
        this.announceChanges(newRecipe);
      });
  }

  editRecipe(oldRecipe: Recipe, newRecipe: Recipe, cb?) {
    this.recipes[this.recipes.indexOf(oldRecipe)] = newRecipe;
    this.storeData().subscribe(
      (data:any) => {
        this.recipesChanges.emit(this.recipes);
        this.announceChanges(newRecipe);
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
}
