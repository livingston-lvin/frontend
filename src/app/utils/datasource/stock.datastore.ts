import { Stock } from './../interface/stock.interface';
import { StockService } from './../api/stock/stock.service';
import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable } from "rxjs";

export class StockDataSource extends DataSource<Stock>{
  private stockSubject = new BehaviorSubject<Stock[]>([]);
  stockCountSubject = new BehaviorSubject<number>(0);
  constructor(private stockService: StockService) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<Stock[]> {
    return this.stockSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.stockSubject.complete();
    this.stockCountSubject.complete();
  }

  loadStocks(offset: number, size: number) {
    this.stockService.getStockCount().subscribe(count => this.stockCountSubject.next(count))

    this.stockService.getStockByRange(offset, size).subscribe(
      response => {
        this.stockSubject.next(response.content)
      }
    )

  }

}
