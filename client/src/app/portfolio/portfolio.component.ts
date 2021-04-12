import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { ICryptoCoin } from '../shared/models/ICryptoCoin';
import { CryptoDataService } from './crypto-data.service';
import { PortfolioService } from './portfolio.service';
import { map } from 'rxjs/operators';
import { CoinAndTransactionsData } from '../shared/models/CoinAndTransactionsData';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  coinIdToAdd: string;
  addedCoinsIds: string[] = [];
  addedCoins: ICryptoCoin[] = [];

  addedCoinsAndTransactionsData: CoinAndTransactionsData[] = [];

  constructor(private portfolioService: PortfolioService, private cryptoDataService: CryptoDataService) { }

  ngOnInit(): void {
    this.getCoinAndTransactionDataForAddedCoins();

    // -----------OLD LOGIC WILL PROLLY NEED----------------
    // //get IDs from added coins
    // this.portfolioService.getAddedCoinsIds().subscribe(coinIds => {
    //   this.addedCoinsIds = coinIds;
    //   // after we got coinIds we can call api for coin data for each coin
    //   this.addedCoinsIds.forEach(cId => {
    //     this.cryptoDataService.getCryptoCoinData(cId).subscribe(coin => {
    //       // adding coin to array after we got data from api
    //       this.addedCoins.push(coin);
    //     }, er => {
    //       console.log(er);
    //     });
    //   });
    // });

    // // subject that is waiting for new added coin and pushes it in addedCoins array
    // this.portfolioService.getNewCoinIdSubject().subscribe(coinId => {
    //   this.cryptoDataService.getCryptoCoinData(coinId).subscribe(coin => {
    //     // adding coin to array after we got data from api
    //     this.addedCoins.push(coin);
    //   }, er => {
    //     console.log(er);
    //   });
    // });
    // ------------------------------------------------------------
  }



  getCoinAndTransactionDataForAddedCoins() {
    this.portfolioService.getAddedCoinsIds().subscribe(coinIds => {
      coinIds.forEach(id => {
        this.getCoinAndTransactionData(id);
      });
    });
  }


  // fetch data from coingecko api and our api combine responses and push it into array
  private getCoinAndTransactionData(coinId) {
    const coinData$ = this.cryptoDataService.getCryptoCoinData(coinId);
    const transactionsData$ = this.portfolioService.getTransactionsForCoin(coinId);

    // combine 2 http responses
    combineLatest([coinData$, transactionsData$]).pipe(
      map(results => ({ coinData: results[0], transactions: results[1] }))
    ).subscribe(pair => {

      const transAndCoinData = new CoinAndTransactionsData(
        pair.coinData.id,
        pair.coinData.symbol,
        pair.coinData.name,
        pair.coinData.image.thumb,
        pair.coinData.image.small,
        pair.coinData.image.large,
        pair.coinData.market_data.current_price.usd,
        pair.coinData.market_data.market_cap.usd,
        pair.coinData.market_data.price_change_percentage_24h,
        pair.coinData.market_data.price_change_percentage_7d,
        pair.coinData.market_data.price_change_percentage_14d,
        pair.coinData.market_data.price_change_percentage_30d,
        pair.coinData.market_data.price_change_24h_in_currency.usd,
        pair.coinData.market_data.price_change_percentage_7d_in_currency.usd,
        pair.coinData.market_data.price_change_percentage_14d_in_currency.usd,
        pair.coinData.market_data.price_change_percentage_30d_in_currency.usd,
        pair.transactions
      )
      // if (pair.coinData.symbol == "eth") {
      //   console.log(transAndCoinData);
      //   console.log("Holdings: ", transAndCoinData.holdings);
      //   console.log("Holdings Value: ", transAndCoinData.holdingsValueUsd);
      //   console.log("Total Profit(Loss): ", transAndCoinData.profitLoss);
      // }

      this.addedCoinsAndTransactionsData.push(transAndCoinData);
      //!!!!!
      // at this point we should next subject and let portfolio-overview and other components of holding change
      // but somehow we need to know which coin got transactions updated
      //!!!!!

      //console.log("PAIR COINDATA: ", pair.coinData.name);
      //console.log("PAIR TRANSAKCIJE: ",pair.transactions);
    });
  }




  // TESTING SOME THINGS
  changeCurrentPriceETH(){
    let x = this.addedCoinsAndTransactionsData.find(x => x.id == 'ethereum');
    console.log(x);
    x.currentPriceUsd = 100;
  }

  add1ETHHolding(){
    let x = this.addedCoinsAndTransactionsData.find(x => x.id == 'ethereum');
    x.transactions.push({id: 'dsadsad', price: 1800, quantity: 1, fees: 0, cost: 1000, earned:0})
  }

  addNewCoinTrans(){
    const transAndCoinData = new CoinAndTransactionsData(
      'pair.coinData.id',
      'pair.coinData.symbol',
      'pair.coinData.name',
      'pair.coinData.image.thumb',
      'pair.coinData.image.small',
      'pair.coinData.image.large',
      1333,
      111111111,
      2,
      2,
      2,
      2,
      111,
      111,
      2323,
      23232,
      [
        {id: 'dsadsad', price: 1800, quantity: 1, fees: 0, cost: 1300, earned:0},
        {id: 'dsadsad', price: 1800, quantity: 1, fees: 0, cost: 1300, earned:0},
        {id: 'dsadsad', price: 1800, quantity: 1, fees: 0, cost: 1300, earned:0},
        {id: 'dsadsad', price: 1800, quantity: 1, fees: 0, cost: 1300, earned:0}
      ]
    )
    this.addedCoinsAndTransactionsData.push(transAndCoinData);
  }

}
