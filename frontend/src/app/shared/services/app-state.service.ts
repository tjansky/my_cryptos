import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BehaviorSubject, Subject } from 'rxjs';
import { AddedCoinIdDto } from '../dtos/AddedCoinIdDto';
import { TransactionDto } from '../dtos/TransactionDto';
import { Coin } from '../models/Coin';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  private newAddedCoinId = new Subject<string>();
  private newAddedTransaction = new Subject<TransactionDto>();
  private deletedAddedCoin = new Subject<AddedCoinIdDto>();
  private deletedTransId = new Subject<number>();

  private coinListSource = new BehaviorSubject<Coin[]>(null);

  constructor(private router: Router) { }

  navigateToTransactionDetails(coinNameId: string){
    this.router.navigateByUrl('/portfolio/transactions/'+coinNameId);
  }

  getCoinList() {
    return this.coinListSource.asObservable();
  }

  updateCoinList(newCoinList: Coin[]) {
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

  // delete coin subject methods
  sendDeletedCoin(deletedCoin: AddedCoinIdDto) {
    this.deletedAddedCoin.next(deletedCoin);
  }

  getDeletedCoin(): Observable<AddedCoinIdDto> {
    return this.deletedAddedCoin.asObservable();
  }

  // delete trans subject methods
  sendDeletedTransId(deletedTransId: number){
    this.deletedTransId.next(deletedTransId);
  }

  getDeletedTransactionId(): Observable<number>{
    return this.deletedTransId.asObservable();
  }
}
