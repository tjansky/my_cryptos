import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICryptoCoin } from '../shared/ICryptoCoin';

@Injectable({
  providedIn: 'root'
})
export class CryptoDataService {

  constructor(private http: HttpClient) { }


  // get coin details
  getCryptoCoinData(coinId: string){
    console.log("CALLING COINGECKO API");
    return this.http.get<ICryptoCoin>(
      "https://api.coingecko.com/api/v3/coins/"+coinId+"?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false");
  }
  
}