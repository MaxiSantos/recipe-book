import { Routes } from '@angular/router';
import { RecipeEditComponent } from '../recipes';
import { RandomRecipeComponent } from '../recipes';

export const FAVOURITE_RECIPE_ROUTES : Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  { path: 'overview', component: RandomRecipeComponent },
  { path: ':id/edit', component: RecipeEditComponent},
]
