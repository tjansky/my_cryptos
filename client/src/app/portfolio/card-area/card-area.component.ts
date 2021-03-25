import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ICryptoCoin } from 'src/app/shared/ICryptoCoin';
import { PortfolioService } from '../portfolio.service';

@Component({
  selector: 'app-card-area',
  templateUrl: './card-area.component.html',
  styleUrls: ['./card-area.component.css']
})
export class CardAreaComponent implements OnInit {
  addedCoinsIds: string[] = [];
  subscription: Subscription;

  constructor(private portfolioService: PortfolioService) { }


  ngOnInit(): void {
    // for now this array is populated with fixed values, in future it will be retrived from our api
    this.addedCoinsIds = this.portfolioService.getAddedCoinsIds();
    console.log("AddedCoinIds in card-area: ", this.addedCoinsIds)

    // listen for new coinId added
    this.subscription = this.portfolioService.getNewCoinIdAdded().subscribe(newCoinId => {
      console.log("proslijeden iz subjecta: ", newCoinId)
      this.addedCoinsIds.push(newCoinId)
    });
  }

  onResetaddedCoinsIds() {
    this.addedCoinsIds = [];
    // get coinIds again since array was updated (user added new coin)
    // good thing is server will be called only for newly added coins
    this.addedCoinsIds = this.portfolioService.getAddedCoinsIds();
    // this.addedCoinsIds.push("cardano");
  }

}
