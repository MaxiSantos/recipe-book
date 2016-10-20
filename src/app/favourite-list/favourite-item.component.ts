import { Input, Component, OnInit } from '@angular/core';
import { Recipe } from '../recipes';
import { RecipeService } from '../recipes';

@Component({
  selector: 'rb-favourite-item',
  templateUrl: './favourite-item.component.html',
  styles: [`
    .pull-left h4{
      display: inline-block
    }
  `]
})
export class FavouriteItemComponent implements OnInit {
  @Input() item: Recipe;
  constructor(public rs: RecipeService) { }

  ngOnInit() {

  }

  onAddingRating() {
    this.item.rating++;
  }

  onDecreasingRating() {
    if (this.item.rating > 0) {
      this.item.rating--;
    }
  }

  onSave() {
    this.rs.editRecipe(this.item, this.item);
  }
}
