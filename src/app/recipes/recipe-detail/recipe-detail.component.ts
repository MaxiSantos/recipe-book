import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { ActivatedRoute, Router } from '@angular/router'

import { RecipeService } from '../recipe.service';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { Recipe } from '../recipe'

@Component({
  selector: 'rb-recipe-detail',
  templateUrl: './recipe-detail.component.html'
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  selectedRecipe: Recipe;
  private subscription : Subscription;
  private subscriptionOnInit : Subscription;
  private recipeIndex: number;

  constructor(
    private sls: ShoppingListService,
    private route: ActivatedRoute,
    private recipeService : RecipeService,
    private router : Router) { }

  ngOnInit() {
    this.subscriptionOnInit = this.route.params.subscribe(
      (params: any) => {
        this.recipeIndex = params['id'];
        console.log(`this.subscriptionOnInit on ${this.constructor.name}`);
        // this should be a getRecipe
        // getRecipe(): should handle if a getAllItems is needed or not
        // TODO, we should work on the getRecipe/getItem service on the
        // ApiService when we have a RESTful api to work with
        this.subscription = this.recipeService.getRecipes().subscribe(
          (params: Recipe[]) => {
            console.log(`this.subscription on ${this.constructor.name}`);
            this.selectedRecipe = this.recipeService.getRecipe(this.recipeIndex);
            //this.subscription.unsubscribe();
            //_this.subscription.unsubscribe();
          }
        );
      }
    )
  }

  ngOnDestroy(){
    this.subscriptionOnInit.unsubscribe();
  }

  onAddToShoppingList(){
    this.sls.addItems(this.selectedRecipe.ingredients)
  }

  onEdit(){
    this.router.navigate(['/recipes', this.recipeIndex, 'edit'])
  }

  onDelete(){
    this.recipeService.deleteRecipe(this.selectedRecipe);
    this.router.navigate(['/recipes'])
  }
}
