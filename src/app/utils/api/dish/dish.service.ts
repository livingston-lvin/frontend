import { Dish } from '../../interface/dish.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  url: string = 'http://localhost:8080/dish'
  constructor(private http: HttpClient) { }

  getDish(dishId: number): Observable<any> {
    return this.http.get<any>(`${this.url}/${dishId}`);
  }

  addDish(dish: Dish): Observable<any> {
    return this.http.post<any>(this.url, dish);
  }

  updateDish(dish: Dish): Observable<any> {
    return this.http.put<any>(this.url, dish);
  }

  deleteDish(dishId: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/${dishId}`);
  }

  getDishes(): Observable<any> {
    return this.http.get<any>(`${this.url}/all`);
  }

  searchDish(search: any): Observable<Dish[]> {
    return this.http.get<any>(`${this.url}/filter/${search}`);
  }

  getDishedByRange(offset:number,size:number): Observable<any> {
    return this.http.get<any>(`${this.url}/get/${offset}/${size}`);
  }

}
