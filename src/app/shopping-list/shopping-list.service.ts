import { Ingredient } from '../shared';

export class ShoppingListService {
  private items: Ingredient[] = [];

  constructor() { }

  getItems(){
    return this.items;
  }

  addItems(items: Ingredient[]){
    // short way to push all items one by one.
    // you could have accomplished this by using a for loop.
    Array.prototype.push.apply(this.items, items);
  }

}
