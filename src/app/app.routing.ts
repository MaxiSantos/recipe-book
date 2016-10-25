import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list';
import { RECIPE_ROUTES } from './recipes/recipes.routes';
import { FAVOURITE_RECIPE_ROUTES } from './favourite-list/favourite-recipes.routes';
import { FavouriteListComponent } from './favourite-list/favourite-list.component';

const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch : 'full'},
  { path: 'recipes', component: RecipesComponent, children: RECIPE_ROUTES},
  { path: 'shopping-list', component: ShoppingListComponent},
  { path: 'favourite', component: FavouriteListComponent, children: FAVOURITE_RECIPE_ROUTES }
];

export const routing = RouterModule.forRoot(APP_ROUTES);

