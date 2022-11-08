import { IngredientService } from './../../../utils/api/ingredient/ingredient.service';
import { Ingredient, Item } from './../../../utils/interface/ingredient.interface';
import { DishService } from './../../../utils/api/dish/dish.service';
import { Dish } from './../../../utils/interface/dish.interface';
import { Stock } from './../../../utils/interface/stock.interface';
import { StockService } from './../../../utils/api/stock/stock.service';
import { isNumeric } from './../../../utils/helper/helper';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, TitleStrategy } from '@angular/router';
import { filter, distinctUntilChanged, debounceTime, tap, switchMap, finalize } from 'rxjs';
import { MatOptionSelectionChange } from '@angular/material/core';
@Component({
  selector: 'app-ingredient-add',
  templateUrl: './ingredient-add.component.html',
  styleUrls: ['./ingredient-add.component.css']
})
export class IngredientAddComponent implements OnInit, AfterViewInit {

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

    this.ingredientId = this.route.snapshot.params['ingredientId']
  }
  ngAfterViewInit(): void {
    this.searchDishListener();
    this.searchStockListener();
  }



  ngOnInit(): void {

    if (this.ingredientId) {
      this.pathchFormValue();
    } else {
      this.rowList.push({ stock: { id: undefined, name: '', quantity: 0 }, quantityUsed: undefined },
        { stock: { id: undefined, name: '', quantity: 0 }, quantityUsed: undefined },
        { stock: { id: undefined, name: '', quantity: 0 }, quantityUsed: undefined })
    }

  }

  pathchFormValue() {
    this.rowList = [];
    this.ingredientService.getIngredient(this.ingredientId).subscribe(response => {
      this.selectedDish = response.dish;
      let items: any[] = response.item;
      let rows = [];
      for (let i = 0; i < items.length; i++) {
        let stock = items[i].stock;
        let qty = items[i].quantityUsed;
        rows.push({ stock, quantityUsed:qty });
      }
      this.rowList=[...items];
      console.log(this.rowList)
    })
  }

  onSelectedStock(event: MatOptionSelectionChange) {
    // console.log(event)
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
        switchMap(value => this.stockService.searchStock(value))
      )
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

  addRow() {
    this.rowList.push({ stock: { id: undefined, name: '', quantity: undefined }, quantityUsed: undefined })
  }

  save() {
    let payload: any;
    // if (this.ingredientId) {
    //   payload = {
    //     id:this.ingredientId,
    //     dish: this.selectedDish,
    //     item: [
    //       {
    //         stock: this.selectedStock,
    //         quantityUsed: this.qtyUsed,
    //       },
    //     ],
    //   };
    //   this.ingredientService.addIngredient(payload).subscribe(
    //     response => {
    //       console.log(response)
    //       this.router.navigate(["ingredient-list"])
    //     },
    //     error => console.log(error),
    //     () => this.loading = false,
    //   );
    // }
    let items: any[] = [];
    this.rowList.forEach(ele => {
      items.push(
        {
          stock: ele.stock,
          quantityUsed: ele.quantityUsed
        }
      )
    })
    payload = {
      dish: this.selectedDish,
      item: items,
    };
    this.ingredientService.addIngredient(payload).subscribe(
      response => {
        console.log(response)
        this.router.navigate(["ingredient-list"])
      },
      error => console.log(error),
      () => this.loading = false,
    );
  }
}
