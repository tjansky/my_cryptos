import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-portfolio-overview',
  templateUrl: './portfolio-overview.component.html',
  styleUrls: ['./portfolio-overview.component.css']
})
export class PortfolioOverviewComponent implements OnInit {


  totalBalance: number = 1;
  portfolioChange24h: number = 1;
  totalProfitLost: number = 1;


  constructor() { }

  ngOnInit(): void {
    // make subjects that will handle updates

  }


}
