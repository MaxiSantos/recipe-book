import { Component, OnChanges, OnInit, Input } from '@angular/core';
import { Ingredient } from '../shared/ingredient';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'rb-shopping-list-add',
  templateUrl: './shopping-list-add.component.html'
})
export class ShoppingListAddComponent implements OnChanges, OnInit {
  isAdding = true;
  @Input() item: Ingredient;

  constructor(private sls: ShoppingListService) { }

  ngOnChanges(changes) {
    this.isAdding = changes.item.currentValue === null;
    this.isAdding ? this.item = {name: null, amount: null} : null;
  }

  ngOnInit(){
    console.log(this.item);
  }

  onSubmit(ingredient: Ingredient){
    const newIngredient = new Ingredient(ingredient.name, ingredient.amount);
    if(!this.isAdding) {
      this.sls.editItem(this.item, newIngredient)
    } else {
      this.item = newIngredient;
      this.sls.addItem(this.item);
    }
  }
}
