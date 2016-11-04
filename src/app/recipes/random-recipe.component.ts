import { Component, OnInit, OnChanges } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { ActivatedRoute, Router } from '@angular/router';

import { Recipe } from './recipe';

import { RecipeRandomService } from './recipe-random.service';

@Component({
  selector: 'rb-random-recipe',
  templateUrl: './random-recipe.component.html',
  providers: [RecipeRandomService]
})
export class RandomRecipeComponent implements OnInit, OnChanges {
  randomRecipe: Recipe;
  subscription: Subscription;

  constructor(
    private rms: RecipeRandomService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
    this.rms.getRandom().subscribe(
      (recipe: Recipe) => {
        // var min = 0,
        //   max = recipes.length - 1,
        //   random = Math.floor(Math.random() * (max - min + 1)) + min;

        // if we make dandomRecipe to be a reference then when we change a value in
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

        this.randomRecipe = recipe;
      })

    // setInterval(() => {
    //   if(this.randomRecipe.rating <= 15) {
    //     this.randomRecipe.rating++;
    //     if(this.randomRecipe.rating == 10) {
    //       //this.randomRecipe.rating = 100;
    //       //this.randomRecipe = new Recipe('name','short desciption','long desciption','',null,150);
    //       this.randomRecipe = Object.create(this.randomRecipe);
    //     }
    //   }
    // }, 2000);

  }

  ngOnChanges(){
    console.log("on random changes");
  }
}
