import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ICryptoCoin } from '../shared/ICryptoCoin';


@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  // in future this will be retrived from db, for now fixed values
  private addedCoinsIds: string[] = ["ethereum", "bitcoin", "chainlink"]; 

  constructor(private http: HttpClient) { }

  getAddedCoinsIds(){
    // return copy of addedCoins array
    return this.addedCoinsIds.slice();
  }


  
  // these are CoinGecko api endpoints, probably will be placed in another service in future
  getCryptoCoinData(coinId: string){
    return this.http.get<ICryptoCoin>(
      "https://api.coingecko.com/api/v3/coins/"+coinId+"?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false");
  }

}
