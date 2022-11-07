import { BillService } from './../../../utils/api/bill/bill.service';
import { IngredientService } from './../../../utils/api/ingredient/ingredient.service';
import { IngredientDataSource } from './../../../utils/datasource/ingredient.datastore';
import { StockService } from './../../../utils/api/stock/stock.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DishService } from 'src/app/utils/api/dish/dish.service';
import { StockDataSource } from 'src/app/utils/datasource/stock.datastore';
import { BillDataSource } from 'src/app/utils/datasource/bill.datastore';
@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.css']
})
export class BillListComponent implements OnInit {

  displayedColumns: string[] = ['sno', 'tblno', 'amount', 'actions'];
  dataSource!: BillDataSource;
  constructor(private billService: BillService, private router: Router) { }

  ngOnInit(): void {
    this.dataSource = new BillDataSource(this.billService);
    this.dataSource.loadBills();
  }

  add() {
    this.router.navigate(["bill-add"]);
  }

  edit(id: number) {
    this.router.navigate(["bill-add", id])
  }

  delete(id: number) {
    this.billService.deleteBill(id).subscribe(
      response => {
        this.load();
      },
      error => console.log(error),
    );
  }

  load() {
    this.dataSource.loadBills();
  }

}
