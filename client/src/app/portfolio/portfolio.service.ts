import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ICryptoCoin } from '../shared/models/ICryptoCoin';
import { Observable, of, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  // in future this will be retrived from db, for now fixed values
  private addedCoinsIds: string[] = ["ethereum", "bitcoin", "chainlink", "dai", "tether", "cardano"]; 
  private newAddedCoinId = new Subject<string>();

  constructor(private http: HttpClient) { }

  // in future this will be retrived from db, for now fixed values
  getAddedCoinsIds(): Observable<string[]>{
    return of(this.addedCoinsIds.slice());
  }

  getTransactionsForCoin(addedCoinId: string): Observable<any[]> {
    return of([{id: "bla bla", amount: 20}, {id: "trans", amount: 122}]);
  }

  addCoinIdToDb(coinId: string): Observable<string> {
    // add new coinId to array of added coin ids
    // in future this will be inserted in db
    this.addedCoinsIds.push(coinId);
    return of(coinId);
    
  }

  sendNewCoinIdSubject(newCoinId: string) {
    this.newAddedCoinId.next(newCoinId);
  }

  getNewCoinIdSubject(): Observable<string> {
    return this.newAddedCoinId;
  }


  

}
