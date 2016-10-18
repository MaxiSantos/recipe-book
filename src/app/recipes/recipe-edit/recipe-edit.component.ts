import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import {
  FormArray,
  FormGroup,
  FormBuilder,
  FormControl,
  Validators }
from '@angular/forms';

import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';
import { MyTypes } from '../../shared';

@Component({
  selector: 'rb-recipe-edit',
  templateUrl: './recipe-edit.component.html'
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  recipeForm: FormGroup; // we need to create the recipeForm so later we bind it to the html form
  private recipeIndex: number;
  private recipe: Recipe; // this is the recipe we are working on
  private subscription: Subscription;
  private isNew: boolean = true;

  @ViewChild('itemName') newIngredientName;
  @ViewChild('itemAmount') newIngredientItemAmount;
  @ViewChild('itemMeasureUnit') newIngredientMeasureUnit;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private formBuilder: FormBuilder,
    private router: Router
    ) { }

  // all thins that goes beyond basic initialization goes on ngInit
  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        this.isNew = !params.hasOwnProperty('id');
        if(this.isNew) {
          this.recipe = null;
        } else {
          this.recipeIndex = +params['id'] //adding + to cast it to number
          this.recipe = this.recipeService.getRecipe(this.recipeIndex);
        }
      }
    );
    this.initForm();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  initForm() {
    let recipeName         = '';
    let recipeImageUrl     = ''
    let recipeLongContent  = '';
    let recipeShortContent = '';
    let recipeIngredients : FormArray = new FormArray([]);

    let isEditing = !this.isNew;
    if(isEditing) {
      for (var i = 0; i < this.recipe.ingredients.length; ++i) {
        recipeIngredients.push(
          new FormGroup({
            name: new FormControl(this.recipe.ingredients[i].name, Validators.required),
            amount: new FormControl(this.recipe.ingredients[i].amount, [
              Validators.required,
              Validators.pattern('^\\d+$')
            ]),
            measurementUnit: new FormControl(this.recipe.ingredients[i].measurementUnit),
            type: new FormControl(this.recipe.ingredients[i].type),
          })
        );
      }
      recipeName         = this.recipe.name;
      recipeImageUrl     = this.recipe.imagePath;
      recipeShortContent = this.recipe.shortDescription;
      recipeLongContent  = this.recipe.longDescription;
    }

    this.recipeForm = this.formBuilder.group({
      name: [recipeName, Validators.required],
      imagePath: [recipeImageUrl, Validators.required],
      shortDescription : [recipeShortContent, Validators.required],
      longDescription : [recipeLongContent, Validators.required],
      ingredients : recipeIngredients
    })
  }

  onSubmit() {
    const newRecipe = this.recipeForm.value;
    if(this.isNew) {
      this.recipeService.addRecipe(newRecipe);
    } else {
      this.recipeService.editRecipe(this.recipe, newRecipe);
    }
    this.navigateBack();
  }

  onUnitChange(index){
    let measurementUnit = this.recipeForm.controls['ingredients']['controls'][index].controls.measurementUnit.value;
    let typeFormControl = (<FormControl>this.recipeForm.controls['ingredients']['controls'][index].controls['type']);
    let measurementUnitFormControl = (<FormControl>this.recipeForm.controls['ingredients']['controls'][index].controls['measurementUnit']);
    if (measurementUnit == "" || measurementUnit.toLowerCase().trim() == "unit") {
      typeFormControl.setValue(MyTypes.CONTABLE);
      measurementUnitFormControl.setValue("unit");
    } else {
      typeFormControl.setValue(MyTypes.UNCONTABLE);
    }
  }

  onCancel() {
    this.navigateBack();
  }

  onRemoveItem(index: number) {
    (<FormArray>this.recipeForm.controls['ingredients']).removeAt(index);
  }

  onAddItem(name: string, amount: string, measurementUnit: string) {
    const isUncontable = measurementUnit.trim() != "";
    let myFormGroup = new FormGroup({
      name: new FormControl(name.trim(), Validators.required),
      amount: new FormControl(amount.trim(), [ // don't need to cast amount to +amount cause it has the built in validation
        Validators.required,
        Validators.pattern('^\\d+$')
      ]),
      type: new FormControl(isUncontable ? MyTypes.UNCONTABLE : MyTypes.CONTABLE)
    })
    if (isUncontable) {
      myFormGroup.controls['measurementUnit'] = new FormControl(measurementUnit);
    } else {
      myFormGroup.controls['measurementUnit'] = new FormControl('unit');
    }
    (<FormArray>this.recipeForm.controls['ingredients']).push(myFormGroup);

    //
    //  TODO, check how to clean these fields
    //

    this.newIngredientName = "";
    this.newIngredientItemAmount = "";
    this.newIngredientMeasureUnit = "";
  }

  private navigateBack() {
    this.router.navigate(['../']); // navigating up one step
  }
}