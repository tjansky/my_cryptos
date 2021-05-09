import { Component, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { Coin } from '../shared/models/Coin';
import { ApiHelperService } from '../shared/services/api-helper.service';
import { AppStateService } from '../shared/services/app-state.service';
import { CoinGeckoService } from '../shared/services/coin-gecko.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  coinsWithTransList: Coin[] = [];

  timerSubscription: Subscription;
  getAddedCoinsIdsSubscription: Subscription;
  getNewCoinIdSubscription: Subscription;
  getAddedTransactionSubscription: Subscription;
  getDeletedCoinSubscription: Subscription;
  getDeletedTransactionIdSubscription: Subscription;


  constructor(private coinGeckoService: CoinGeckoService, private apiHelperService: ApiHelperService, private appStateService: AppStateService) {}


  ngOnInit(){
    // retriving data for already added coins
    this.getAddedCoinsIdsSubscription = this.apiHelperService.getAddedCoinsIds().subscribe(coinIdList => {
      coinIdList.forEach(coinIdObject => {
        this.getCoinDataAndUpdateList(coinIdObject.coinNameId, coinIdObject.transactions);
      })
    }); 

    // subject that listens for new coin
    this.getNewCoinIdSubscription = this.appStateService.getNewCoinIdSubject().subscribe(addedCoinId => {
      this.getCoinDataAndUpdateList(addedCoinId);
    });

    // subject that listens for added transaction and updates coin object
    this.getAddedTransactionSubscription = this.appStateService.getAddedTransaction().subscribe(addedTrans => {
      this.coinsWithTransList.find(c => c.idName == addedTrans.addedCoinNameId).transactions.push(addedTrans);
      this.appStateService.updateCoinList(this.coinsWithTransList);
    });

    // subject that listens for deleted coin and removes it from list
    this.getDeletedCoinSubscription = this.appStateService.getDeletedCoin().subscribe(deletedCoin => {
      this.coinsWithTransList = this.coinsWithTransList.filter(c => c.idName != deletedCoin.coinNameId);
      this.appStateService.updateCoinList(this.coinsWithTransList);
    });

    // subject that listens for deleted transaction and updates coin object
    this.getDeletedTransactionIdSubscription = this.appStateService.getDeletedTransactionId().subscribe(deletedTransId => {
      this.coinsWithTransList.forEach(c => {
        c.transactions = c.transactions.filter(t => t.id != deletedTransId);
      });
      this.appStateService.updateCoinList(this.coinsWithTransList);
    });
    

    // interval that gets coin data with price changes and updates changes
    this.timerSubscription = timer(5000, 60000).subscribe(x => {
      this.getUpdatedCoinsData();
      this.appStateService.updateCoinList(this.coinsWithTransList);
    });
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

  private getUpdatedCoinsData(){
    // get all coin ids that need to be updated
    const coinNameIdList: string[] = this.coinsWithTransList.map(c => c.idName);

    this.coinGeckoService.getCryptoCoinSimplePriceData(coinNameIdList).subscribe(res => {
      let keysOfObjects: string[] = Object.keys(res)
      console.log(keysOfObjects);

      // if retrived data for id coins exists in coins array, update it with new prices
      this.coinsWithTransList.forEach(c => {
         if(keysOfObjects.includes(c.idName)) {
          c.currentPriceUsd = res[c.idName].usd;
          c.marketCapUsd = res[c.idName].usd_market_cap;
          // maybe add usd24
         }
      });
    });
  }

  ngOnDestroy() {
    this.timerSubscription.unsubscribe();
    this.getAddedCoinsIdsSubscription.unsubscribe();
    this.getNewCoinIdSubscription.unsubscribe();
    this.getAddedTransactionSubscription.unsubscribe();
    this.getDeletedCoinSubscription.unsubscribe();
    this.getDeletedTransactionIdSubscription.unsubscribe();
  }

}
