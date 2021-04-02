import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CoinAndTransactionsData } from 'src/app/shared/models/CoinAndTransactionsData';
import { ICryptoCoin } from 'src/app/shared/models/ICryptoCoin';
import { PortfolioService } from '../portfolio.service';

@Component({
  selector: 'app-card-area',
  templateUrl: './card-area.component.html',
  styleUrls: ['./card-area.component.css']
})
export class CardAreaComponent implements OnInit {
  //addedCoinsIds: string[] = [];

  @Input() addedCoinsAndTrans: CoinAndTransactionsData[] = [];

  subscription: Subscription;

  constructor(private portfolioService: PortfolioService) { }


  ngOnInit(): void {
   }

}
