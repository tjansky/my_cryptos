import { Component, OnInit } from '@angular/core';
import { ICryptoCoin } from '../shared/ICryptoCoin';
import { CryptoDataService } from './crypto-data.service';
import { PortfolioService } from './portfolio.service';

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


  }

  onCoinAdd() {
    if (this.coinIdToAdd) {
      // after coin id is saved to db
      this.portfolioService.addCoinIdToDb(this.coinIdToAdd).subscribe(addedCoinId => {  // !!! maybe instead of calling server for new coinid array, we just pass addedCoinId to array !!!
        // after coinId is saved to dn, get his data nad push it to array
        this.cryptoDataService.getCryptoCoinData(this.coinIdToAdd).subscribe(coin => {
          // adding coin to array after we got data from api
          this.addedCoins.push(coin);
        }, er => {
          console.log(er);
        });
      });


    }
  }

}
