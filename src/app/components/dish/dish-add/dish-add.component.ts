import { Dish } from './../../../utils/interface/dish.interface';
import { isNumericDecimal } from './../../../utils/helper/helper';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FileInputComponent } from 'ngx-material-file-input';
import { DishService } from 'src/app/utils/api/dish/dish.service';



@Component({
  selector: 'app-dish-add',
  templateUrl: './dish-add.component.html',
  styleUrls: ['./dish-add.component.css']
})
export class DishAddComponent implements OnInit {

  form!: FormGroup;

  loading: boolean = false;

  isDecimal = (event: any) => isNumericDecimal(event);

  dishId!: number;

  img: string = "";

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private dishService: DishService) {
    this.dishId = route.snapshot.params["dishId"];
  }

  ngOnInit(): void {

    this.form = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      image: ['', Validators.required],
    })

    if (this.dishId) {
      this.loading = true;
      this.dishService.getDish(this.dishId).subscribe(
        response => {
          let dish: Dish = response;
          this.img = response.image;
          this.form.patchValue({
            name: dish.name,
            price: dish.price,
            image: dish.image,
          })
        },
        error => console.log(error),
        () => this.loading = false,
      );
    }
  }

  clearImage() {
    this.img = "";
  }

  validate() {
    return !this.form.valid;
  }

  browse(file: FileInputComponent) {
    file.open();
  }

  save() {
    if (this.dishId) {
      let payload: Dish = {
        id: this.dishId,
        name: this.form.value.name,
        price: this.form.value.price,
        image: this.form.value.image._fileNames,
      };
      this.loading = true;

      this.dishService.updateDish(payload).subscribe(
        response => {
          this.router.navigate(["dish-list"])
        },
        error => console.log(error),
        () => this.loading = false,
      );
    }
    else {
      let payload: Dish = {
        name: this.form.value.name,
        price: this.form.value.price,
        image: this.form.value.image._fileNames,
      };
      this.loading = true;

      this.dishService.addDish(payload).subscribe(
        response => {
          this.router.navigate(["dish-list"])
        },
        error => console.log(error),
        () => this.loading = false,
      );
    }
  }
}
