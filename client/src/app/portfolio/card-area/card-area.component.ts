import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ICryptoCoin } from 'src/app/shared/ICryptoCoin';
import { PortfolioService } from '../portfolio.service';

@Component({
  selector: 'app-card-area',
  templateUrl: './card-area.component.html',
  styleUrls: ['./card-area.component.css']
})
export class CardAreaComponent implements OnInit {
  //addedCoinsIds: string[] = [];

  @Input() addedCoins: ICryptoCoin[] = [];
  subscription: Subscription;

  constructor(private portfolioService: PortfolioService) { }


  ngOnInit(): void {
    console.log("initial addedCoins in card-area: ", this.addedCoins);
   }

}
