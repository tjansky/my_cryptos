import { Component, Input, OnInit } from '@angular/core';
import { ICryptoCoin } from 'src/app/shared/models/ICryptoCoin';
import { PortfolioService } from '../../portfolio.service';

@Component({
  selector: 'app-coin-card',
  templateUrl: './coin-card.component.html',
  styleUrls: ['./coin-card.component.css']
})
export class CoinCardComponent implements OnInit {
  //@Input() cryptoCoinId: string;
  @Input() cryptoCoin: ICryptoCoin;

  constructor(private portfolioService: PortfolioService) { }

  ngOnInit(): void {
    //console.log("loadam coin-card componentu ", this.cryptoCoin.name);
  }

}
