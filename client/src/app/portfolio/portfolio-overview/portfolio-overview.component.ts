import { Component, Input, OnInit } from '@angular/core';
import { CoinAndTransactionsData } from 'src/app/shared/models/CoinAndTransactionsData';


@Component({
  selector: 'app-portfolio-overview',
  templateUrl: './portfolio-overview.component.html',
  styleUrls: ['./portfolio-overview.component.css']
})
export class PortfolioOverviewComponent implements OnInit {
@Input() addedCoinsAndTrans: CoinAndTransactionsData[] = [];

  totalBalance: number = 1;
  portfolioChange24h: number = 1;
  totalProfitLost: number = 1;


  constructor() { }

  ngOnInit(): void {
    // make subjects that will handle updates

  }


}
