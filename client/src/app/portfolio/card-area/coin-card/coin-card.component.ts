import { Component, Input, OnInit } from '@angular/core';
import { CoinAndTransactionsData } from 'src/app/shared/models/CoinAndTransactionsData';
import { ICryptoCoin } from 'src/app/shared/models/ICryptoCoin';
import { PortfolioService } from '../../portfolio.service';

@Component({
  selector: 'app-coin-card',
  templateUrl: './coin-card.component.html',
  styleUrls: ['./coin-card.component.css']
})
export class CoinCardComponent implements OnInit {
  @Input() addedCoinAndTrans: CoinAndTransactionsData;

  constructor(private portfolioService: PortfolioService) { }

  ngOnInit(): void {

  }

}
