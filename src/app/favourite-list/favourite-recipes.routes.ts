import { Routes } from '@angular/router';
import { RecipeEditComponent } from '../recipes';
import { FavouriteListComponent } from './';

export const FAVOURITE_RECIPE_ROUTES : Routes = [
  { path: '', component: FavouriteListComponent},
  { path: ':id/edit', component: RecipeEditComponent},
]