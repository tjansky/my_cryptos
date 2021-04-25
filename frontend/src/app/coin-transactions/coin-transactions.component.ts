import { Component, OnInit } from '@angular/core';
import { Coin } from '../shared/models/Coin';
import { AppStateService } from '../shared/services/app-state.service';

@Component({
  selector: 'app-coin-transactions',
  templateUrl: './coin-transactions.component.html',
  styleUrls: ['./coin-transactions.component.css']
})
export class CoinTransactionsComponent implements OnInit {

  coinWithTrans: Coin;
  selectedCoinIdName = 'ethereum';
  
  constructor(private appStateService: AppStateService) { }

  ngOnInit(): void {
    // b subject - listening for coin list changes
    this.appStateService.getCoinList().subscribe(updatedCoinList => {
      if(updatedCoinList == null)
        return;
      this.coinWithTrans = updatedCoinList.find(x => x.idName == this.selectedCoinIdName);
    });
  }

}
