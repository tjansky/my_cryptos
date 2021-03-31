import { Component, Input, OnInit } from '@angular/core';
import { ICryptoCoin } from 'src/app/shared/models/ICryptoCoin';

@Component({
  selector: 'app-coin-table',
  templateUrl: './coin-table.component.html',
  styleUrls: ['./coin-table.component.css']
})
export class CoinTableComponent implements OnInit {
  @Input() addedCoins: ICryptoCoin[] = [];

  constructor() { }

  ngOnInit(): void {
    console.log("addedCoins in coin-table: ", this.addedCoins);
  }

}
