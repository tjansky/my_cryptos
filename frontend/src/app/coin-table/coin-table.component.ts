import { Component, OnInit } from '@angular/core';
import { Coin } from '../shared/models/Coin';
import { AppStateService } from '../shared/services/app-state.service';

@Component({
  selector: 'app-coin-table',
  templateUrl: './coin-table.component.html',
  styleUrls: ['./coin-table.component.css']
})
export class CoinTableComponent implements OnInit {
  coinsWithTransList: Coin[] = [];
  
  constructor(private appStateService: AppStateService) { }

  ngOnInit(): void {
    // b subject - listening for coin list changes
    this.appStateService.getCoinList().subscribe(updatedCoinList => {
      this.coinsWithTransList = updatedCoinList;
    });
    
  }

  onTransactionDetails(coinNameId: string){
    this.appStateService.navigateToTransactionDetails(coinNameId);
  }

}
