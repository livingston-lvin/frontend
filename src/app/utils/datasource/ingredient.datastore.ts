import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable } from "rxjs";
import { IngredientService } from "../api/ingredient/ingredient.service";
import { Ingredient } from "../interface/ingredient.interface";

export class IngredientDataSource extends DataSource<Ingredient>{
  private ingredientSubject = new BehaviorSubject<Ingredient[]>([]);

  constructor(private ingredientService: IngredientService) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<Ingredient[]> {
    return this.ingredientSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.ingredientSubject.complete();
  }

  loadIngredients() {
    this.ingredientService.getIngredients().subscribe(

      response => {
        this.ingredientSubject.next(response)
      }
    )
  }

}
