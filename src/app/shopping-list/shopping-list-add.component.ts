import { ViewChild, Component, OnChanges, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';

import { Ingredient, MyTypes } from '../shared';
import { ShoppingListService } from './shopping-list.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'rb-shopping-list-add',
  templateUrl: './shopping-list-add.component.html',
  providers: [ ApiService ]
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
    this.isAdding ? this.item = new Ingredient(null, null, MyTypes.NONE) : '';
  }

  ngOnInit(){
  }

  onSubmit(form: NgForm){
    let newIngredient,
      measurementUnit = form.controls['measurementUnit'].value,
      isUncontable = measurementUnit !== '';
    if (isUncontable) {
      newIngredient = new Ingredient(form.controls['name'].value, form.controls['amount'].value, MyTypes.UNCONTABLE, measurementUnit);
    } else {
      newIngredient = new Ingredient(form.controls['name'].value, form.controls['amount'].value, MyTypes.CONTABLE);
    }

    if (this.isAdding) {
      this.item = newIngredient;
      this.sls.addItem(this.item);
      this.onClear();
    } else {
      this.sls.editItem(this.item, newIngredient)
      this.onClear();
    }
    setTimeout(() => {
      this.form.reset()
    });
  }

  onDelete() {
    this.sls.deleteItem(this.item);
    this.onClear();
  }

  onClear() {
    this.isAdding = true;
    this.cleared.emit(null);
  }

  onClearAll(){
    this.isAdding = true;
    this.clearedAll.emit(null);
  }
}