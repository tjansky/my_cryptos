import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoinDataDto } from '../dtos/CoinDataDto';

@Injectable({
  providedIn: 'root'
})
export class CoinGeckoService {

  constructor(private http: HttpClient) { }

  getCryptoCoinData(coinId: string){
    return this.http.get<CoinDataDto>(
      "https://api.coingecko.com/api/v3/coins/"+coinId+"?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false");
  }


}
