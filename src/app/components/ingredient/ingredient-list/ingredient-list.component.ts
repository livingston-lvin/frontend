import { IngredientService } from './../../../utils/api/ingredient/ingredient.service';
import { IngredientDataSource } from './../../../utils/datasource/ingredient.datastore';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.css']
})
export class IngredientListComponent implements OnInit {

  displayedColumns: string[] = ['sno', 'name',  'actions'];
  dataSource!: IngredientDataSource;

  rowLength: number = 100;
  offset: number = 0;
  pageSize: number = 5;
  pageSizeArray: number[] = [5, 10]
  rowId: number = 0;

  constructor(private ingredientService:IngredientService, private router: Router) { }

  ngOnInit(): void {
    this.dataSource = new IngredientDataSource(this.ingredientService);
    this.dataSource.loadIngredients();
  }

  getSerialNo() {
    // if (this.rowLength == 0 || this.pageSize == 0) {
    //   return;
    // }
    // const startIndex = this.offset * this.pageSize;
    // this.rowId = startIndex + 1;
  }

  onChangePage(page: any) {
    // this.offset = page.pageIndex;
    // this.pageSize = page.pageSize;
    // this.dataSource.loadDishes(this.offset, this.pageSize);
    // this.getSerialNo();

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
