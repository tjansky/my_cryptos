import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Coin } from '../../shared/models/Coin';
import { ApiHelperService } from '../../shared/services/api-helper.service';
import { AppStateService } from '../../shared/services/app-state.service';

@Component({
  selector: 'app-coin-table',
  templateUrl: './coin-table.component.html',
  styleUrls: ['./coin-table.component.css']
})
export class CoinTableComponent implements OnInit {
  getCoinSubscription: Subscription;
  coinsWithTransList: Coin[] = [];
  
  constructor(private appStateService: AppStateService, private apiHelperService: ApiHelperService) { }

  ngOnInit(): void {
    // b subject - listening for coin list changes
    this.getCoinSubscription = this.appStateService.getCoinList().subscribe(updatedCoinList => {
      this.coinsWithTransList = updatedCoinList;
    });
    
  }

  onTransactionDetails(coinNameId: string){
    this.appStateService.navigateToTransactionDetails(coinNameId);
  }


  onAddedCoinDelete(coinNameId: string) {
    this.apiHelperService.deleteAddedCoin(coinNameId).subscribe(deletedCoin => {
      if(deletedCoin == null) {
        console.log("something went wrong while deleteing coin");
        return;
      }
      // let know other components that coin got deleted
      this.appStateService.sendDeletedCoin(deletedCoin);
    });
  }

  ngOnDestroy(){
    this.getCoinSubscription.unsubscribe();
  }
}
