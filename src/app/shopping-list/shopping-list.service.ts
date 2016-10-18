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

  addItem(item: Ingredient){
    this.items.push(item)
  }

  editItem(oldItem: Ingredient, newItem: Ingredient){
    this.items[this.items.indexOf(oldItem)] = newItem;
  }

  deleteItem (item: Ingredient){
    this.items.splice(this.items.indexOf(item), 1);
  }

  deleteAll(){
    // if assigning this.items = [] we are creating a new array but this not update other places where
    // this.item was binded
    this.items.splice(0);

  }

}
