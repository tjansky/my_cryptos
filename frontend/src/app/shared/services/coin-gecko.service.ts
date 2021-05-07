import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoinDataDto } from '../dtos/CoinDataDto';
import { CoinNameSymbolDto } from '../dtos/CoinNameSymbolDto';
import { SimplePriceCoinDto } from '../dtos/SimplePriceCoinDto';

@Injectable({
  providedIn: 'root'
})
export class CoinGeckoService {

  constructor(private http: HttpClient) { }

  getCryptoCoinData(coinId: string){
    return this.http.get<CoinDataDto>(
      "https://api.coingecko.com/api/v3/coins/"+coinId+"?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false");
  }

  getCryptoCoinSimplePriceData(coinNameIdList: string[]){
    // logic for building special(that coingecko endpoint uses) url
    const currencyPartUrl = '&vs_currencies=usd';
    let idsPartUrl = '?ids=';
      coinNameIdList.forEach((id, index, array) => {
        if(index === array.length - 1) {
          idsPartUrl = idsPartUrl + id;
        } else {
          idsPartUrl = idsPartUrl + id + '%2C';
        }
    });
    
    return this.http.get<SimplePriceCoinDto[]>('https://api.coingecko.com/api/v3/simple/price'+idsPartUrl+currencyPartUrl+'&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true');
  }

  getAllCoinNamesAndIds() {
    return this.http.get<CoinNameSymbolDto[]>("https://api.coingecko.com/api/v3/coins/list?include_platform=false");
  }

}
