import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DishAddComponent } from './components/dish/dish-add/dish-add.component';
import { DishListComponent } from './components/dish/dish-list/dish-list.component';
import { StockAddComponent } from './components/stock/stock-add/stock-add.component';
import { StockListComponent } from './components/stock/stock-list/stock-list.component';
import { IngredientAddComponent } from './components/ingredient/ingredient-add/ingredient-add.component';
import { IngredientListComponent } from './components/ingredient/ingredient-list/ingredient-list.component';
import { BillAddComponent } from './components/bill/bill-add/bill-add.component';
import { BillListComponent } from './components/bill/bill-list/bill-list.component';
import { MaterialModule } from './utils/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { LayoutComponent } from './components/layout/layout.component';

@NgModule({
  declarations: [
    AppComponent,
    DishAddComponent,
    DishListComponent,
    StockAddComponent,
    StockListComponent,
    IngredientAddComponent,
    IngredientListComponent,
    BillAddComponent,
    BillListComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MaterialFileInputModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
