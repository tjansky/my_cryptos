import { Component, OnInit } from '@angular/core';
import { ICryptoCoin } from 'src/app/shared/ICryptoCoin';
import { PortfolioService } from '../portfolio.service';

@Component({
  selector: 'app-card-area',
  templateUrl: './card-area.component.html',
  styleUrls: ['./card-area.component.css']
})
export class CardAreaComponent implements OnInit {
  addedCoinsIds: string[] = [];

  constructor(private portfolioService: PortfolioService) { }


  ngOnInit(): void {
    // for now this array is populated with fixed values, in future it will be retrived from our api
    this.addedCoinsIds = this.portfolioService.getAddedCoinsIds();
    console.log("AddedCoinIds in card-area: ", this.addedCoinsIds)
  }

}
