import { Component, Input, OnInit } from '@angular/core';
import { CoinAndTransactionsData } from 'src/app/shared/models/CoinAndTransactionsData';
import { ICryptoCoin } from 'src/app/shared/models/ICryptoCoin';

@Component({
  selector: 'app-coin-table',
  templateUrl: './coin-table.component.html',
  styleUrls: ['./coin-table.component.css']
})
export class CoinTableComponent implements OnInit {
  @Input() addedCoinsAndTrans: CoinAndTransactionsData[] = [];

  constructor() { }

  ngOnInit(): void {
    console.log("TABLE: ", this.addedCoinsAndTrans)
  }

}
