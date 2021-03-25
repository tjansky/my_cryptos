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

  // subject that will be passed to components when addedCoinsIds array is changed
  private addedCoinIdSource = new Subject<string>();

  constructor(private http: HttpClient) { }

  getAddedCoinsIds(){
    // return copy of addedCoins array
    return this.addedCoinsIds.slice();
  }

  addCoinId(coinId: string) {
    // add new coinId to array of added coin ids
    console.log("adding coin id to array: ", coinId);
    this.addedCoinsIds.push(coinId);
    // in future this will be inserted in db
  }

  // method that sets coinId into subject
  setNewCoinIdAdded(newCoinId: string) {
    this.addedCoinIdSource.next(newCoinId);
  }

  // method that needs to be subscribed in order to listen for new coinIds added
  getNewCoinIdAdded() {
    return this.addedCoinIdSource.asObservable();
  }

  //
  // these are CoinGecko api endpoints, probably will be placed in another service in future
  getCryptoCoinData(coinId: string){
    return this.http.get<ICryptoCoin>(
      "https://api.coingecko.com/api/v3/coins/"+coinId+"?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false");
  }

}
