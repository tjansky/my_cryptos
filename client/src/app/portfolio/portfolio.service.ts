import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ICryptoCoin } from '../shared/ICryptoCoin';
import { Observable, of, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  // in future this will be retrived from db, for now fixed values
  private addedCoinsIds: string[] = ["ethereum", "bitcoin", "chainlink", "dai", "tether", "cardano"]; 

  constructor(private http: HttpClient) { }

  // in future this will be retrived from db, for now fixed values
  getAddedCoinsIds(): Observable<string[]>{
    return of(this.addedCoinsIds.slice());
  }

  addCoinIdToDb(coinId: string): Observable<string> {
    // add new coinId to array of added coin ids
    // in future this will be inserted in db
    this.addedCoinsIds.push(coinId);
    return of(coinId);
    
  }


  

}
