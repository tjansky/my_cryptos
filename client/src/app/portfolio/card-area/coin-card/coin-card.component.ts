import { Component, Input, OnInit } from '@angular/core';
import { ICryptoCoin } from 'src/app/shared/ICryptoCoin';
import { PortfolioService } from '../../portfolio.service';

@Component({
  selector: 'app-coin-card',
  templateUrl: './coin-card.component.html',
  styleUrls: ['./coin-card.component.css']
})
export class CoinCardComponent implements OnInit {
  @Input() cryptoCoinId: string;
  cryptoCoin: ICryptoCoin;

  constructor(private portfolioService: PortfolioService) { }

  ngOnInit(): void {
    // after component is instantiated call CoinGecko endpoint to get data about coin
    this.portfolioService.getCryptoCoinData(this.cryptoCoinId).subscribe(coinData => {
      this.cryptoCoin = coinData;
    }, er => {
      console.log(er);
    });
  }

}
