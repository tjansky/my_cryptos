import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { ICryptoCoin } from '../shared/models/ICryptoCoin';
import { CryptoDataService } from './crypto-data.service';
import { PortfolioService } from './portfolio.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  coinIdToAdd: string;
  addedCoinsIds: string[] = [];
  addedCoins: ICryptoCoin[] = [];

  constructor(private portfolioService: PortfolioService, private cryptoDataService: CryptoDataService) { }

  ngOnInit(): void {
    //get IDs from added coins
    this.portfolioService.getAddedCoinsIds().subscribe(coinIds => {
      this.addedCoinsIds = coinIds;
      // after we got coinIds we can call api for coin data for each coin
      this.addedCoinsIds.forEach(cId => {
        this.cryptoDataService.getCryptoCoinData(cId).subscribe(coin => {
          // adding coin to array after we got data from api
          this.addedCoins.push(coin);
        }, er => {
          console.log(er);
        });
      });
    });

    // subject that is waiting for new added coin and pushes it in addedCoins array
    this.portfolioService.getNewCoinIdSubject().subscribe(coinId => {
      this.cryptoDataService.getCryptoCoinData(coinId).subscribe(coin => {
        // adding coin to array after we got data from api
        this.addedCoins.push(coin);
      }, er => {
        console.log(er);
      });
    });
  }



  getCoinAndTransactionData(){
    this.portfolioService.getAddedCoinsIds().subscribe(coinIds => {
      coinIds.forEach(element => {
        const coinData$ = this.cryptoDataService.getCryptoCoinData(element);
        const transactionsData$ = this.portfolioService.getTransactionsForCoin(element);

        // combine 2 http responses
        combineLatest([coinData$, transactionsData$]).pipe(
          map(results => ({coinData: results[0], transactions: results[1]}))
        ).subscribe( pair => {
          console.log("PAIR COINDATA: ", pair.coinData.name);
          console.log("PAIR TRANSAKCIJE: ",pair.transactions);
        });
      });
    });
  }


}
