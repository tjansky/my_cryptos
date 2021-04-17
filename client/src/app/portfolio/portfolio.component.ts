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

  addedCoinsAndTransactionsData: CoinAndTransactionsData[] = [];

  constructor(private portfolioService: PortfolioService, private cryptoDataService: CryptoDataService) { }

  ngOnInit(): void {
    // initial load of added coins and transactions
    this.getCoinAndTransactionDataForAddedCoins();

    // subject that is waiting for new added coin and pushes it in addedCoins array
    this.portfolioService.getNewCoinIdSubject().subscribe(coinId => {
      this.getCoinAndTransactionData(coinId)
    });

    // subject that removes deleted CoinAndTrans object from array
    this.portfolioService.getDeletedCoinId().subscribe(deletedCoinId => {
      // remove deleted coin from array
      this.addedCoinsAndTransactionsData = this.addedCoinsAndTransactionsData.filter(coin => coin.idName !== deletedCoinId);
    });
  }

  // method that retrives all data for all addedCoins
  private getCoinAndTransactionDataForAddedCoins() {
    this.portfolioService.getAddedCoinsIds().subscribe(coinList => {
      coinList.forEach(coin => {
        this.getCoinAndTransactionData(coin.coinNameId);
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

      this.addedCoinsAndTransactionsData.push(transAndCoinData);
    });
  }



//----------------------------------
  // TESTING SOME THINGS
  changeCurrentPriceETH(){
    let x = this.addedCoinsAndTransactionsData.find(x => x.idName == 'ethereum');
    console.log(x);
    x.currentPriceUsd = 100;
  }

  add1ETHHolding(){
    let x = this.addedCoinsAndTransactionsData.find(x => x.idName == 'ethereum');
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
