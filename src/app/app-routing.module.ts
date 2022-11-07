import { BillListComponent } from './components/bill/bill-list/bill-list.component';
import { BillAddComponent } from './components/bill/bill-add/bill-add.component';
import { IngredientListComponent } from './components/ingredient/ingredient-list/ingredient-list.component';
import { IngredientAddComponent } from './components/ingredient/ingredient-add/ingredient-add.component';
import { StockListComponent } from './components/stock/stock-list/stock-list.component';
import { StockAddComponent } from './components/stock/stock-add/stock-add.component';
import { DishListComponent } from './components/dish/dish-list/dish-list.component';
import { DishAddComponent } from './components/dish/dish-add/dish-add.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'dish-add',
    component: DishAddComponent,
  },
  {
    path: 'dish-add/:dishId',
    component: DishAddComponent,
  },
  {
    path: 'dish-list',
    component: DishListComponent,
  },




  {
    path: 'stock-add',
    component: StockAddComponent,
  },
  {
    path: 'stock-add/:stockId',
    component: StockAddComponent,
  },
  {
    path: 'stock-list',
    component: StockListComponent,
  },



  {
    path: 'ingredient-add',
    component: IngredientAddComponent,
  },
  {
    path: 'ingredient-add/:ingredientId',
    component: IngredientAddComponent,
  },
  {
    path: 'ingredient-list',
    component: IngredientListComponent,
  },



  {
    path: 'bill-add',
    component: BillAddComponent,
  },
  {
    path: 'bill-add/:ingredientId',
    component: BillAddComponent,
  },
  {
    path: 'bill-list',
    component: BillListComponent,
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
