import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ICryptoCoin } from '../shared/ICryptoCoin';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  // in future this will be retrived from db, for now fixed values
  private addedCoinsIds: string[] = ["ethereum", "bitcoin", "chainlink"]; 

  constructor(private http: HttpClient) { }

  // in future this will be retrived from db, for now fixed values
  getAddedCoinsIds(){
    // return copy of addedCoins array
    return this.addedCoinsIds.slice();
  }

  addCoinIdToDb(coinId: string) {
    // add new coinId to array of added coin ids
    console.log("adding coin id to array: ", coinId);
    this.addedCoinsIds.push(coinId);
    // in future this will be inserted in db
  }


  

}
