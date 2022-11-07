import { Stock } from './../../interface/stock.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  url: string = 'http://localhost:8080/stock'
  constructor(private http: HttpClient) { }

  getStock(stockId: number): Observable<any> {
    return this.http.get<any>(`${this.url}/${stockId}`);
  }

  addStock(stock:Stock): Observable<any> {
    return this.http.post<any>(this.url, stock);
  }

  updateStock(stock: Stock): Observable<any> {
    return this.http.put<any>(this.url, stock);
  }

  deleteStock(stockId: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/${stockId}`);
  }

  getStocks(): Observable<any> {
    return this.http.get<any>(`${this.url}/all`);
  }

  searchStock(search: any): Observable<any[]> {
    return this.http.get<any>(`${this.url}/filter/${search}`);
  }

  getStockByRange(offset:number,size:number): Observable<any> {
    return this.http.get<any>(`${this.url}/get/${offset}/${size}`);
  }
}
