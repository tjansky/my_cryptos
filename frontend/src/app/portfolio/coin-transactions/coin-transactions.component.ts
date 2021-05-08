import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Coin } from '../../shared/models/Coin';
import { ApiHelperService } from '../../shared/services/api-helper.service';
import { AppStateService } from '../../shared/services/app-state.service';

@Component({
  selector: 'app-coin-transactions',
  templateUrl: './coin-transactions.component.html',
  styleUrls: ['./coin-transactions.component.css']
})
export class CoinTransactionsComponent implements OnInit {

  coinWithTrans: Coin;
  // selectedCoinIdName = 'ethereum';
  
  constructor(private appStateService: AppStateService, private route: ActivatedRoute, private apiHelperService: ApiHelperService) { }

  ngOnInit(): void {
    // b subject - listening for coin list changes
    this.appStateService.getCoinList().subscribe(updatedCoinList => {
      if(updatedCoinList == null)
        return;
      const coinNameId: string = this.route.snapshot.params.id;
      this.coinWithTrans = updatedCoinList.find(x => x.idName == coinNameId);
    });
  }

  onTransactionDelete(transId: number){
    this.apiHelperService.deleteTransaction(transId).subscribe(deletedTransId => {
      if(deletedTransId == null) {
        console.log("something went wrong while deleting trans");
        return;
      }
      // send deleted trans id to other components via subject
      this.appStateService.sendDeletedTransId(deletedTransId);
    });
  }

}
