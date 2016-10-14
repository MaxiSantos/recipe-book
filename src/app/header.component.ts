import { Component } from '@angular/core';

import { RecipeService } from './recipes/recipe.service';

@Component({
  selector: 'rb-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(private recipeService: RecipeService) {}

  onStore() {
    this.recipeService.storeData().subscribe(
      (data: any) => console.log(data),
      (error: any) => console.log(error)
    )
  }

  onFetch() {
    this.recipeService.fetchData()
  }

}
