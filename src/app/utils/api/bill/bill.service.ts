import { Bill } from './../../interface/bill.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  url: string = 'http://localhost:8080/bill'
  constructor(private http: HttpClient) { }

  getBill(billId: number): Observable<any> {
    return this.http.get<any>(`${this.url}/${billId}`);
  }

  addBill(bill: Bill): Observable<any> {
    return this.http.post<any>(this.url, bill);
  }

  updateBill(bill: Bill): Observable<any> {
    return this.http.put<any>(this.url, bill);
  }

  deleteBill(billId: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/${billId}`);
  }

  getBills(): Observable<any> {
    return this.http.get<any>(`${this.url}/all`);
  }

  searchBill(search: any): Observable<Bill[]> {
    return this.http.get<any>(`${this.url}/filter/${search}`);
  }

}
