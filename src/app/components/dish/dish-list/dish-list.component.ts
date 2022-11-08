import { DishDataSource } from './../../../utils/datasource/dish.datastore';
import { Router } from '@angular/router';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DishService } from 'src/app/utils/api/dish/dish.service';

@Component({
  selector: 'app-dish-list',
  templateUrl: './dish-list.component.html',
  styleUrls: ['./dish-list.component.css']
})
export class DishListComponent implements OnInit {
  displayedColumns: string[] = ['sno', 'name', 'price', 'actions'];
  dataSource!: DishDataSource;

  rowLength: number = 0;
  offset: number = 0;
  pageSize: number = 5;
  pageSizeArray: number[] = [5, 10]
  rowId: number = 0;

  constructor(private dishService: DishService, private router: Router) { }

  ngOnInit(): void {
    this.dataSource = new DishDataSource(this.dishService);
    this.dataSource.loadDishes(0, 5);
    this.getSerialNo();
    this.dataSource.dishCountSubject.subscribe(count => this.rowLength = count)
  }

  getSerialNo() {
    const startIndex = this.offset * this.pageSize;
    this.rowId = startIndex + 1;
  }

  onChangePage(page: any) {
    this.offset = page.pageIndex;
    this.pageSize = page.pageSize;
    this.dataSource.loadDishes(this.offset, this.pageSize);
    this.getSerialNo();

  }

  addDish() {
    this.router.navigate(["dish-add"]);
  }

  editDish(dishId: number) {
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
    this.dataSource.loadDishes(this.offset, this.pageSize);
  }

}
