import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BehaviorSubject, Subject } from 'rxjs';
import { TransactionDto } from '../dtos/TransactionDto';
import { Coin } from '../models/Coin';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  private newAddedCoinId = new Subject<string>();
  private newAddedTransaction = new Subject<TransactionDto>();

  private coinListSource = new BehaviorSubject<Coin[]>(null);

  constructor(private router: Router) { }

  navigateToTransactionDetails(coinNameId: string){
    this.router.navigateByUrl('/transactions/'+coinNameId);
  }

  getCoinList() {
    return this.coinListSource.asObservable();
  }

  updateCoinList(newCoinList) {
    this.coinListSource.next(newCoinList);
  }

  // add coin subject methods
  sendNewCoinIdSubject(newCoinId: string) {
    this.newAddedCoinId.next(newCoinId);
  }

  getNewCoinIdSubject(): Observable<string> {
    return this.newAddedCoinId.asObservable();
  }

  // add transaction subject methods
  sendAddedTransaction(addedTrans: TransactionDto){
    this.newAddedTransaction.next(addedTrans);
  }

  getAddedTransaction(): Observable<TransactionDto>{
    return this.newAddedTransaction.asObservable();
  }

}
