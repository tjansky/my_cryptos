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


  getAddedCoinsIds(): Observable<DbCoin[]>{
    return this.http.get<DbCoin[]>('https://localhost:5001/AddedCoin');

    //return of(this.addedCoinsIds.slice());
  }

  getTransactionsForCoin(addedCoinId: string): Observable<ITransaction[]> {
    const fixedValues = [
      {id: 'transakcija1', price: 1820, quantity: 1, fees: 0, cost: 1000, earned: 0}
    ]

    return of(fixedValues);
  }

  addCoinIdToDb(coinId: string): Observable<string> {
    // add new coinId to array of added coin ids
    // in future this will be inserted in db
    //this.addedCoinsIds.push(coinId);
    return of(coinId);
    
  }

  sendNewCoinIdSubject(newCoinId: string) {
    this.newAddedCoinId.next(newCoinId);
  }

  getNewCoinIdSubject(): Observable<string> {
    return this.newAddedCoinId;
  }


  

}
