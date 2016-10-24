import { Component, Input } from '@angular/core';
import { Recipe } from '../recipe';

@Component({
  selector: 'rb-recipe-item',
  templateUrl: './recipe-item.component.html',
  styles:[`
    .pull-left .badge{
      float:none!important
    }
    .pull-left h4{
      display: inline-block
    }
  `]
})
export class RecipeItemComponent {
  @Input() recipeItem: Recipe;
  @Input() recipeId: number;

}
