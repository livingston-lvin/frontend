import { IngredientService } from './../../../utils/api/ingredient/ingredient.service';
import { Ingredient } from './../../../utils/interface/ingredient.interface';
import { DishService } from './../../../utils/api/dish/dish.service';
import { Dish } from './../../../utils/interface/dish.interface';
import { Stock } from './../../../utils/interface/stock.interface';
import { StockService } from './../../../utils/api/stock/stock.service';
import { isNumeric } from './../../../utils/helper/helper';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, distinctUntilChanged, debounceTime, tap, switchMap, finalize } from 'rxjs';
import { MatOptionSelectionChange } from '@angular/material/core';
@Component({
  selector: 'app-ingredient-add',
  templateUrl: './ingredient-add.component.html',
  styleUrls: ['./ingredient-add.component.css']
})
export class IngredientAddComponent implements OnInit {

  selectedDish: any = "";
  searchDishControl = new FormControl('');
  filteredDish: Dish[] = [];
  loading: boolean = false;
  minLength: number = 3;

  selectedStock: any = "";
  searchStockControl = new FormControl('');
  filteredStock: Stock[] = [];
  qtyUsed!: number;

  rowList: any[] = [];
  ingredientId!: number;

  numeric = (event: any) => isNumeric(event);

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private stockService: StockService, private dishService: DishService,
    private ingredientService: IngredientService) {
    this.rowList.push({ stock: { name: '', quantity: 0 }, quantityUsed: undefined })
    this.ingredientId = this.route.snapshot.params['ingredientId']
  }

  ngOnInit(): void {
    this.searchDishListener();
    this.searchStockListener();

    if (this.ingredientId) {
      this.ingredientService.getIngredient(this.ingredientId).subscribe(
        response => {
          this.selectedDish = response.dish;
          this.selectedStock = response.item[0].stock;
          this.qtyUsed = response.item[0].quantityUsed;
        },
        error => console.log(error),
        () => this.loading = false,
      );
    }

  }

  onSelectedStock(event: MatOptionSelectionChange) {
    // console.log(event)
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

  searchStockListener() {
    this.searchStockControl.valueChanges
      .pipe(
        filter(res => res !== null && res.length > 0),
        debounceTime(1000),
        switchMap(value => this.stockService.searchStock(value)))
      .subscribe(data => {
        if (data == undefined) this.filteredStock = [];
        else this.filteredStock = data;
      });
  }

  // validate() {
  //   return !this.form.valid;
  // }

  displayWith(value: any) {
    return value?.name;
  }

  clearDishSelection() {
    this.selectedDish = "";
    this.filteredDish = [];
  }

  clearStockSelection() {
    this.selectedStock = "";
    this.filteredStock = [];
  }

  save() {
    if (this.ingredientId) {
      let dish: Dish = this.selectedDish;
      let stock: Stock = this.selectedStock;
      let ingredient: Ingredient = {
        dish: dish,
        item: [
          {
            stock: stock,
            quantityUsed: this.qtyUsed
          }
        ]
      }
      console.log(ingredient)
      this.ingredientService.updateIngredient(ingredient).subscribe(
        response => {
          this.router.navigate(["ingredient-list"])
        },
        error => console.log(error),
        () => this.loading = false,
      );
    }
    else {
      let dish: Dish = this.selectedDish;
      let stock: Stock = this.selectedStock;
      let ingredient: Ingredient = {
        dish: dish,
        item: [
          {
            stock: stock,
            quantityUsed: this.qtyUsed
          }
        ]
      }
      console.log(ingredient)
      this.ingredientService.addIngredient(ingredient).subscribe(
        response => {
          this.router.navigate(["ingredient-list"])
        },
        error => console.log(error),
        () => this.loading = false,
      );
    }
    // if (this.ingredientId) {
    //   let payload: Ingredient = {
    //     ingredientId: this.ingredientId,
    //     dish: this.form.value.dish,
    //     stocks: [],
    //   };
    //   this.loading = true;

    //   this.stockService.updateStock({}).subscribe(
    //     response => {
    //       this.router.navigate(["stock-list"])
    //     },
    //     error => console.log(error),
    //     () => this.loading = false,
    //   );
    // }
    // else {
    //   let payload: Stock = {
    //     name: this.form.value.name,
    //     quantity: this.form.value.quantity,
    //   };
    //   this.loading = true;

    //   this.stockService.addStock(payload).subscribe(
    //     response => {
    //       this.router.navigate(["stock-list"])
    //     },
    //     error => console.log(error),
    //     () => this.loading = false,
    //   );
    // }
  }
}
