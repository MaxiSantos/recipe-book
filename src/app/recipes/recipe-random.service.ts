import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Recipe } from './recipe';
import { RecipeService } from './recipe.service';

@Injectable()
export class RecipeRandomService {

  constructor(
    private rs: RecipeService
  ) { }

  getRandom(): Observable<any> {
    return this.rs.getRecipes()
  }
}
