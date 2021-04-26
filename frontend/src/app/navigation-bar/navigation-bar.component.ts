import { Component, OnInit } from '@angular/core';
import { CreateTransactionDto } from '../shared/dtos/CreateTransactionDto';
import { ApiHelperService } from '../shared/services/api-helper.service';
import { AppStateService } from '../shared/services/app-state.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  constructor(private apiHelperService: ApiHelperService,private appStateService: AppStateService) { }

  ngOnInit(): void {
  }

  onCoinAdd(coinId){
    this.apiHelperService.addAddedCoin(coinId).subscribe(res => {
      if(res == 1) {
        this.appStateService.sendNewCoinIdSubject(coinId);
      } else {
        alert("something went wrong while insert added coin");
      }
    });
  }

  onTransactionAdd(coinNameId: string){
    let createTrans: CreateTransactionDto = {addedCoinId: 63, type: 1, price: 2000, quantity: 1, fee: 0, cost: 2000, earned: 0}
    this.apiHelperService.addTransaction(createTrans).subscribe(res => {
      if (res != null) {
        // send new trans to coin list via subject
        // TODO - will have to send coinNAMEID with transactiondto
        this.appStateService.sendAddedTransaction(res);
        console.log(res);
      } else {
        alert("something went wrong while insert coin transaction");
      }
    });
  }

  onCoinDelete(){

  }

  onTransactionDelete(){
    
  }

}
