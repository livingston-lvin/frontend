import { Stock } from './../../../utils/interface/stock.interface';
import { StockService } from './../../../utils/api/stock/stock.service';
import { isNumeric } from './../../../utils/helper/helper';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-stock-add',
  templateUrl: './stock-add.component.html',
  styleUrls: ['./stock-add.component.css']
})
export class StockAddComponent implements OnInit {

  form!: FormGroup;

  loading: boolean = false;

  numeric = (event: any) => isNumeric(event);

  stockId!: number;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private stockService: StockService) {
    this.stockId = route.snapshot.params["stockId"];
  }

  ngOnInit(): void {

    this.form = this.fb.group({
      name: ['', Validators.required],
      quantity: ['', Validators.required],
    })

    if (this.stockId) {
      this.loading = true;
      this.stockService.getStock(this.stockId).subscribe(
        response => {
          let stock: Stock = response;
          this.form.patchValue({
            name: stock.name,
            quantity: stock.quantity,
          })
        },
        error => console.log(error),
        () => this.loading = false,
      );
    }
  }

  validate() {
    return !this.form.valid;
  }

  save() {
    if (this.stockId) {
      let payload: Stock = {
        id: this.stockId,
        name: this.form.value.name,
        quantity: this.form.value.quantity,
      };
      this.loading = true;

      this.stockService.updateStock(payload).subscribe(
        response => {
          this.router.navigate(["stock-list"])
        },
        error => console.log(error),
        () => this.loading = false,
      );
    }
    else {
      let payload: Stock = {
        name: this.form.value.name,
        quantity: this.form.value.quantity,
      };
      this.loading = true;

      this.stockService.addStock(payload).subscribe(
        response => {
          this.router.navigate(["stock-list"])
        },
        error => console.log(error),
        () => this.loading = false,
      );
    }
  }
}
