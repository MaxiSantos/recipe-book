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
  private recipeIndex: number;

  constructor(
    private sls: ShoppingListService,
    private route: ActivatedRoute,
    private recipeService : RecipeService,
    private router : Router) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        this.recipeIndex = params['id'];
        //this.selectedRecipe = this.recipeService.getRecipe(this.recipeIndex);
        let recipeFromMemory = this.recipeService.getRecipes();
        if(!!recipeFromMemory) {
          this.selectedRecipe = this.recipeService.getRecipe(this.recipeIndex);
        } else {
          this.recipeService.recipesChanges.subscribe(
            (params: Recipe[]) => {
              this.selectedRecipe = this.recipeService.getRecipe(this.recipeIndex);
              this.recipeService.recipesChanges.unsubscribe();
            }
          )
        }
      }
    )
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
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
