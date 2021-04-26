import { Component } from '@angular/core';
import { Coin } from './shared/models/Coin';
import { ApiHelperService } from './shared/services/api-helper.service';
import { AppStateService } from './shared/services/app-state.service';
import { CoinGeckoService } from './shared/services/coin-gecko.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  coinsWithTransList: Coin[] = [];


  constructor(private coinGeckoService: CoinGeckoService, private apiHelperService: ApiHelperService, private appStateService: AppStateService) {}


  ngOnInit(){
    // retriving data for already added coins
    this.apiHelperService.getAddedCoinsIds().subscribe(coinIdList => {
      coinIdList.forEach(coinIdObject => {
        this.getCoinDataAndUpdateList(coinIdObject.coinNameId, coinIdObject.transactions);
      })
    }); 

    // subject that listens for new coin
    this.appStateService.getNewCoinIdSubject().subscribe(addedCoinId => {
      this.getCoinDataAndUpdateList(addedCoinId);
    });

    // subject that listens for added transaction and updates coin object
    this.appStateService.getAddedTransaction().subscribe(addedTrans => {
      this.coinsWithTransList.find(c => c.idName == 'ethereum').transactions.push(addedTrans);
    });

    // subject that listens for deleted coin and removes it from list


    // subject that listens for deleted transaction and updates coin object

  }


  // method that retrives coin data from coin gecko and calls subject to tell other components 
  private getCoinDataAndUpdateList(coinId, transactions = []){
    console.log(coinId)
    this.coinGeckoService.getCryptoCoinData(coinId).subscribe(coinData => {
      const coinWithTrans = new Coin(
        coinData.id,
        coinData.symbol,
        coinData.name,
        coinData.image.thumb,
        coinData.image.small,
        coinData.image.large,
        coinData.market_data.current_price.usd,
        coinData.market_data.market_cap.usd,
        coinData.market_data.price_change_percentage_24h,
        coinData.market_data.price_change_percentage_7d,
        coinData.market_data.price_change_percentage_14d,
        coinData.market_data.price_change_percentage_30d,
        coinData.market_data.price_change_24h_in_currency.usd,
        coinData.market_data.price_change_percentage_7d_in_currency.usd,
        coinData.market_data.price_change_percentage_14d_in_currency.usd,
        coinData.market_data.price_change_percentage_30d_in_currency.usd,
        transactions
      );
      this.coinsWithTransList.push(coinWithTrans);
      // update bh subject
      this.appStateService.updateCoinList(this.coinsWithTransList);
    });
  }

}
