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

  rowLength: number = 0;
  offset: number = 0;
  pageSize: number = 5;
  pageSizeArray: number[] = [5, 10]
  rowId: number = 0;

  constructor(private stockService: StockService, private router: Router) { }

  ngOnInit(): void {
    this.dataSource = new StockDataSource(this.stockService);
    this.dataSource.loadStocks(0,5);
    this.getSerialNo();
    this.dataSource.stockCountSubject.subscribe(count=>this.rowLength=count)
  }

  getSerialNo() {
    const startIndex = this.offset * this.pageSize;
    this.rowId = startIndex + 1;
  }

  onChangePage(page: any) {
    this.offset = page.pageIndex;
    this.pageSize = page.pageSize;
    this.dataSource.loadStocks(this.offset, this.pageSize);
    this.getSerialNo();

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
        this.loadStocks();
      },
      error => console.log(error),
    );
  }

  loadStocks() {
    this.dataSource.loadStocks(this.offset, this.pageSize);
  }

}
