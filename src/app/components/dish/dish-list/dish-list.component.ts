import { DishDataSource } from './../../../utils/datasource/dish.datastore';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DishService } from 'src/app/utils/api/dish/dish.service';

@Component({
  selector: 'app-dish-list',
  templateUrl: './dish-list.component.html',
  styleUrls: ['./dish-list.component.css']
})
export class DishListComponent implements OnInit {
  displayedColumns: string[] = ['sno', 'name', 'price', 'actions'];
  dataSource!: DishDataSource;

  pageSize:number = 5;
  pageSizeArray:number[] = [5, 10]
  offset:number = 0;
  size:number = 0;

  constructor(private dishService: DishService, private router: Router) { }

  ngOnInit(): void {
    this.dataSource = new DishDataSource(this.dishService);
    this.dataSource.loadDishes(0,5);
  }

  onChangePage(page: any) {
    this.offset = page.pageIndex;
    this.size = page.pageSize;
    this.dataSource.loadDishes(this.offset,this.size);
  }

  addDish() {
    this.router.navigate(["dish-add"]);
  }

  editDish(dishId: number) {
    console.log(dishId)
    this.router.navigate(["dish-add", dishId])
  }

  deleteDish(dishId: number) {
    this.dishService.deleteDish(dishId).subscribe(
      response => {
        this.loadDishes();
      },
      error => console.log(error),
    );
  }

  loadDishes() {
    this.dataSource.loadDishes(this.offset,this.size);
  }

}
