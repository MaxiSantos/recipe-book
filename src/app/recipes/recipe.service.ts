import { Injectable } from '@angular/core';
import { Recipe } from './recipe';
import { Ingredient } from '../shared';


@Injectable()
export class RecipeService {
  private recipes : Recipe[] = [
    new Recipe("Schnitzel", "Very tasty", "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat", "https://lotsglutenfree.files.wordpress.com/2016/06/goatscheese-and-salmon-pastries-1.jpg?w=128&h=128&crop=1", [
        new Ingredient('French Fires', 2),
        new Ingredient('Pork Meat', 1)
      ]),
    new Recipe("Summer Salad", "Okayish", "Minim veniam, quis nostrud exercitation ullamco ut aliquip ex commodo consequat", "http://s3.evcdn.com/images/block/I0-001/033/185/910-9.jpeg_/sushi-madness-edible-adventures-okc-north-10.jpeg", [
        new Ingredient('Pizza Fires', 5),
        new Ingredient('Cow Meat', 3)
        ])
  ];
  constructor() { }

  getRecipes(){
    return this.recipes;
  }
}
