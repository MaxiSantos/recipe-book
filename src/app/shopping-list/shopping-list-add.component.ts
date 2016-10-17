import { ViewChild, Component, OnChanges, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient';
import { ShoppingListService } from './shopping-list.service';
import { FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'rb-shopping-list-add',
  templateUrl: './shopping-list-add.component.html'
})
export class ShoppingListAddComponent implements OnChanges, OnInit {
  isAdding = true;
  @Input() item: Ingredient;
  @Output() cleared = new EventEmitter();
  @Output() clearedAll = new EventEmitter();
  @ViewChild('myForm') form: FormGroup;

  constructor(private sls: ShoppingListService) { }

  ngOnChanges(changes) {
    this.isAdding = changes.item.currentValue === null;
    this.isAdding ? this.item = {name: null, amount: null} : '';
    console.log('on changes');
  }

  ngOnInit(){
    console.log(this.item);
  }

  //onSubmit(ingredient: Ingredient){
  //onSubmit(form: FormGroup){
  onSubmit(form: NgForm){
    //const newIngredient = new Ingredient(form.ingredient.name, ingredient.amount);
    const newIngredient = new Ingredient(form.controls['name'].value, form.controls['amount'].value);
    //const newIngredient = new Ingredient(null, null);

    if(this.isAdding) {
      this.item = newIngredient;
      this.sls.addItem(this.item);
      this.onClear();
    } else {
      this.sls.editItem(this.item, newIngredient)
      this.onClear();
    }
    //this.form.reset();
    setTimeout(() => {
      this.form.reset()
    });

    //this.form.reset({name: null, ammount: null});

    console.log('on submiting');

    //form.resetForm()
  }

  onDelete() {
    this.sls.deleteItem(this.item);
    this.onClear();
  }

  commonClear() {
    this.isAdding = true;
    // this allow us to clear the shoping list when the user just write content
    //this.item = new Ingredient(null, null);

  }

  onClear() {
    this.commonClear();
    this.cleared.emit(null);
  }

  onClearAll(){
    this.commonClear();
    this.clearedAll.emit(null);
  }

}
