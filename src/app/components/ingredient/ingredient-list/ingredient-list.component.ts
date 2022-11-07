import { IngredientService } from './../../../utils/api/ingredient/ingredient.service';
import { IngredientDataSource } from './../../../utils/datasource/ingredient.datastore';
import { StockService } from './../../../utils/api/stock/stock.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DishService } from 'src/app/utils/api/dish/dish.service';
import { StockDataSource } from 'src/app/utils/datasource/stock.datastore';
@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.css']
})
export class IngredientListComponent implements OnInit {

  displayedColumns: string[] = ['sno', 'name',  'actions'];
  dataSource!: IngredientDataSource;
  constructor(private ingredientService:IngredientService, private router: Router) { }

  ngOnInit(): void {
    this.dataSource = new IngredientDataSource(this.ingredientService);
    this.dataSource.loadIngredients();
  }

  add() {
    this.router.navigate(["ingredient-add"]);
  }

  edit(id: number) {
    this.router.navigate(["ingredient-add", id])
  }

  delete(id: number) {
    this.ingredientService.deleteIngredient(id).subscribe(
      response => {
        this.load();
      },
      error => console.log(error),
    );
  }

  load() {
    this.dataSource.loadIngredients();
  }

}
