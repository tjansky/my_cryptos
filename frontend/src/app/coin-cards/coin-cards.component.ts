import { Component, OnInit } from '@angular/core';
import { Coin } from '../shared/models/Coin';
import { AppStateService } from '../shared/services/app-state.service';

@Component({
  selector: 'app-coin-cards',
  templateUrl: './coin-cards.component.html',
  styleUrls: ['./coin-cards.component.css']
})
export class CoinCardsComponent implements OnInit {
  coinsWithTransList: Coin[] = [];
  
  constructor(private appStateService: AppStateService) { }

  ngOnInit(): void {
    // b subject - listening for coin list changes
    this.appStateService.getCoinList().subscribe(updatedCoinList => {
      this.coinsWithTransList = updatedCoinList;
    });
    
  }

}
