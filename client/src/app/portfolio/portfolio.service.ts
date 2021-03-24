import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ICryptoCoin } from '../shared/ICryptoCoin';


@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor(private http: HttpClient) { }

  getCryptoCoinData(coinId: string){
    return this.http.get<ICryptoCoin>(
      "https://api.coingecko.com/api/v3/coins/"+coinId+"?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false")
  }

}
