import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject, Subject } from 'rxjs';
import { Coin } from '../models/Coin';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  private newAddedCoinId = new Subject<string>();
  private coinListSource = new BehaviorSubject<Coin[]>(null);

  constructor() { }

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

}
