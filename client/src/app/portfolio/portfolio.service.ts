import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ICryptoCoin } from '../shared/models/ICryptoCoin';
import { Observable, of, Subject } from 'rxjs';
import { ITransaction } from '../shared/models/CoinAndTransactionsData';
import { DbCoin } from '../shared/models/DbCoin';


@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  //private addedCoinsIds: string[] = ["ethereum"]; 
  private newAddedCoinId = new Subject<string>();

  constructor(private http: HttpClient) { }

  // get coins form db
  getAddedCoinsIds(): Observable<DbCoin[]>{
    return this.http.get<DbCoin[]>('https://localhost:5001/AddedCoin');
  }

  // insert coin in db
  addCoinIdToDb(coinId: string): Observable<number> {
    return this.http.post<number>('https://localhost:5001/AddedCoin', {coinNameid: coinId});
  }


  getTransactionsForCoin(addedCoinId: string): Observable<ITransaction[]> {
    const fixedValues = [
      {id: 'transakcija1', price: 1820, quantity: 1, fees: 0, cost: 1000, earned: 0}
    ]

    return of(fixedValues);
  }

  
  
  sendNewCoinIdSubject(newCoinId: string) {
    this.newAddedCoinId.next(newCoinId);
  }

  getNewCoinIdSubject(): Observable<string> {
    return this.newAddedCoinId;
  }


  

}
