import { Component, Input, OnInit } from '@angular/core';
import { Ingredient } from '../shared';
import { ShoppingListService } from './shopping-list.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'rb-shopping-list',
  templateUrl: './shopping-list.component.html',
  providers: [ ApiService ]
})
export class ShoppingListComponent implements OnInit {
  items: Ingredient[];
  selectedIngredient: Ingredient = null; // not undefined, null to specify not selected item
  //selectedItem: Ingredient = null; // not undefined, null to specify not selected item

  constructor(private sls: ShoppingListService) {}

  ngOnInit() {
    this.items = this.sls.getItems();
  }

  onSelectItem(item: Ingredient){
    this.selectedIngredient = item;
  }

  onCleared() {
    this.selectedIngredient = null;
  }

  onClearAll() {
    this.sls.deleteAll();
  }

}
