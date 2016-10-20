import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { FavouriteListComponent } from './favourite-list/favourite-list.component';
import { RECIPE_ROUTES } from './recipes';
import { FAVOURITE_RECIPE_ROUTES } from './favourite-list';

const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch : 'full'},
  { path: 'recipes', component: RecipesComponent, children: RECIPE_ROUTES},
  { path: 'shopping-list', component: ShoppingListComponent},
  { path: 'favourite', component: FavouriteListComponent, children: FAVOURITE_RECIPE_ROUTES }
];

export const routing = RouterModule.forRoot(APP_ROUTES);

