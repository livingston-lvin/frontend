import { BillService } from './../api/bill/bill.service';
import { Bill } from './../interface/bill.interface';
import { Stock } from '../interface/stock.interface';
import { StockService } from '../api/stock/stock.service';
import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable } from "rxjs";

export class BillDataSource extends DataSource<Bill>{
  private billSubject = new BehaviorSubject<Bill[]>([]);

  constructor(private billService: BillService) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<Bill[]> {
    return this.billSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.billSubject.complete();
  }

  loadBills() {
    this.billService.getBills().subscribe(
      response => {
        this.billSubject.next(response)
      }
    )
  }

}
