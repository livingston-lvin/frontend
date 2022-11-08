import { Bill } from './../../../utils/interface/bill.interface';
import { BillService } from './../../../utils/api/bill/bill.service';
import { DishService } from './../../../utils/api/dish/dish.service';
import { Dish } from './../../../utils/interface/dish.interface';
import { isNumeric, isNumericDecimal } from './../../../utils/helper/helper';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter,  debounceTime, tap, switchMap } from 'rxjs';
import { MatOptionSelectionChange } from '@angular/material/core';
@Component({
  selector: 'app-bill-add',
  templateUrl: './bill-add.component.html',
  styleUrls: ['./bill-add.component.css']
})
export class BillAddComponent implements OnInit {

  selectedDish: any = "";
  searchDishControl = new FormControl('');
  filteredDish: Dish[] = [];
  loading: boolean = false;
  minLength: number = 3;

  price!: number;
  quantity!: number;
  amount!: number;
  totalAmount!: number;
  tblNo!: number;

  rowList: any[] = [];
  billId!: number;

  numeric = (event: any) => isNumeric(event);
  decimal = (event: any) => isNumericDecimal(event);

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private billService: BillService, private dishService: DishService) {
    this.billId = this.route.snapshot.params['billId']
  }

  ngOnInit(): void {
    this.searchDishListener();

    if (this.billId) {
      this.billService.getBill(this.billId).subscribe(
        response => {
          console.log(response)
        },
        error => console.log(error),
        () => this.loading = false,
      );
    }

  }

  onSelectedStock(event: MatOptionSelectionChange) {
  }

  addRow() {
  }

  searchDishListener() {
    this.searchDishControl.valueChanges
      .pipe(
        filter(res => res !== null && res.length > 0),
        debounceTime(1000),
        switchMap(value => this.dishService.searchDish(value)))
      .subscribe((data: any) => {
        if (data == undefined) this.filteredDish = [];
        else this.filteredDish = data;
      });
  }

  displayWith(value: any) {
    return value?.name;
  }

  clearDishSelection() {
    this.selectedDish = "";
    this.filteredDish = [];
  }

  calulateAmount() {
    this.amount = 0;
    this.totalAmount = 0;
    if (this.price !== undefined && this.quantity !== undefined) {
      this.amount = this.price * this.quantity
      this.totalAmount = this.amount;
    }
  }

  save() {
    if (this.billId) {

    }
    else {
      let payload: Bill = {
        tableNo: +this.tblNo,
        totalAmount: this.totalAmount,
        billItem: [
          {
            price: +this.price,
            quantity: +this.quantity,
            amount: this.amount,
            dish: this.selectedDish,
          }
        ]
      }
      console.log(payload)
      this.billService.addBill(payload).subscribe(
        response => {
          console.log(response)
          this.router.navigate(["bill-list"])
        },
        error => console.log(error),
        () => this.loading = false,
      );
    }
  }
}
