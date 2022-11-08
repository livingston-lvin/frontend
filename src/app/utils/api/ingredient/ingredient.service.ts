import { Ingredient } from './../../interface/ingredient.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  url: string = 'http://localhost:8080/ingredient'
  constructor(private http: HttpClient) { }

  getIngredient(ingredientId: number): Observable<any> {
    return this.http.get<any>(`${this.url}/${ingredientId}`);
  }

  addIngredient(ingredient:any): Observable<any> {
    return this.http.post<any>(this.url, ingredient);
  }

  updateIngredient(ingredient: Ingredient): Observable<any> {
    return this.http.put<any>(this.url, ingredient);
  }

  deleteIngredient(ingredientId: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/${ingredientId}`);
  }

  getIngredients(): Observable<any> {
    return this.http.get<any>(`${this.url}/all`);
  }
}
