import { Stock } from './../interface/stock.interface';
import { StockService } from './../api/stock/stock.service';
import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable } from "rxjs";

export class StockDataSource extends DataSource<Stock>{
  private stockSubject = new BehaviorSubject<Stock[]>([]);

  constructor(private stockService: StockService) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<Stock[]> {
    return this.stockSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.stockSubject.complete();
  }

  loadStocks(offset: number, size: number) {
    this.stockService.getStockByRange(offset, size).subscribe(
      response => {
        this.stockSubject.next(response.content)
      }
    )

  }

}
