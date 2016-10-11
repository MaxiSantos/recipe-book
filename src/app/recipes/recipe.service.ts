import { Injectable } from '@angular/core';
import { Recipe } from './recipe';

@Injectable()
export class RecipeService {
  private recipes : Recipe[] = [
    new Recipe("Schnitzel", "Very tasty", "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat", "https://bigoven-res.cloudinary.com/image/upload/t_recipe-256/main---wiener-schnitzel-8f03d26e1f0f2601215a7029.jpg", []),
    new Recipe("Summer Salad", "Okayish", "Minim veniam, quis nostrud exercitation ullamco ut aliquip ex commodo consequat", "http://resizer.otstatic.com/v2/photos/large/23896550.jpg", [])
  ];
  constructor() { }

  getRecipes(){
    return this.recipes;
  }
}
