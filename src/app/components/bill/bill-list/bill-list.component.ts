import { BillService } from './../../../utils/api/bill/bill.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BillDataSource } from 'src/app/utils/datasource/bill.datastore';
@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.css']
})
export class BillListComponent implements OnInit {

  displayedColumns: string[] = ['sno', 'tblno', 'amount', 'actions'];
  dataSource!: BillDataSource;

  rowLength: number = 100;
  offset: number = 0;
  pageSize: number = 5;
  pageSizeArray: number[] = [5, 10]
  rowId: number = 0;

  constructor(private billService: BillService, private router: Router) { }

  ngOnInit(): void {
    this.dataSource = new BillDataSource(this.billService);
    this.dataSource.loadBills();
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
