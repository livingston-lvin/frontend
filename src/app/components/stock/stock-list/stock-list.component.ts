import { StockService } from './../../../utils/api/stock/stock.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { StockDataSource } from 'src/app/utils/datasource/stock.datastore';
@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {

  displayedColumns: string[] = ['sno', 'name', 'price', 'actions'];
  dataSource!: StockDataSource;

  pageSize:number = 5;
  pageSizeArray:number[] = [5, 10]
  constructor(private stockService: StockService, private router: Router) { }

  ngOnInit(): void {
    this.dataSource = new StockDataSource(this.stockService);
    this.dataSource.loadStocks(0,5);
  }

  onChangePage(page: any) {
    console.log(page)
    let offset = page.pageIndex;
    let size = page.pageSize;
    this.dataSource.loadStocks(offset,size);
  }

  add() {
    this.router.navigate(["stock-add"]);
  }

  edit(id: number) {
    this.router.navigate(["stock-add", id])
  }

  delete(id: number) {
    this.stockService.deleteStock(id).subscribe(
      response => {
        this.load();
      },
      error => console.log(error),
    );
  }

  load() {
    this.dataSource.loadStocks(0,5);
  }

}
