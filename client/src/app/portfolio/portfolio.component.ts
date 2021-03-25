import { Component, OnInit } from '@angular/core';
import { PortfolioService } from './portfolio.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  coinIdToAdd: string;

  constructor(private portfolioService: PortfolioService) { }

  ngOnInit(): void {
    this.portfolioService.getCryptoCoinData('ethereum').subscribe(res => {
      console.log(res);
    })
  }

  onCoinAdd() {
    if (this.coinIdToAdd) {
      this.portfolioService.addCoinId(this.coinIdToAdd);
      // after new coin id is inserted in db, pass updated array to other places with subject
      this.portfolioService.setNewCoinIdAdded(this.coinIdToAdd);

    }
  }

}
