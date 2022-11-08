import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable } from "rxjs";
import { DishService } from "../api/dish/dish.service";
import { Dish } from "../interface/dish.interface";

export class DishDataSource extends DataSource<Dish>{
  private dishSubject = new BehaviorSubject<Dish[]>([]);
  dishCountSubject = new BehaviorSubject<number>(0);

  constructor(private dishService: DishService) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<Dish[]> {
    return this.dishSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.dishSubject.complete();
    this.dishCountSubject.complete();
  }

  loadDishes(offset: number, size: number) {
    this.dishService.getDishCount().subscribe(count => this.dishCountSubject.next(count))
    this.dishService.getDishedByRange(offset, size).subscribe(
      response => this.dishSubject.next(response.content))
  }

}
