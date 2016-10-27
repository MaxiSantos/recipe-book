import { Component } from '@angular/core';

import { RecipeService } from './recipes/recipe.service';
import { IApiConfig } from './interface-api-config';

@Component({
  selector: 'rb-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(private rs: RecipeService) {}

  onStore() {
    this.rs.storeData().subscribe(
      (data: any) => console.log(data),
      (error: any) => console.log(error)
    )
  }

  onFetch() {
    this.rs.getRecipes(true).subscribe();
  }



}
