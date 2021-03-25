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


  // SOON IN NEW SERVICE
  // these are CoinGecko api endpoints, probably will be placed in another service in future
  getCryptoCoinData(coinId: string){
    console.log("CALLING COINGECKO API");
    return this.http.get<ICryptoCoin>(
      "https://api.coingecko.com/api/v3/coins/"+coinId+"?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false");
  }

}
