import { Component, OnInit } from '@angular/core';
import { Coin } from '../../shared/models/Coin';
import { AppStateService } from '../../shared/services/app-state.service';

@Component({
  selector: 'app-portfolio-stats',
  templateUrl: './portfolio-stats.component.html',
  styleUrls: ['./portfolio-stats.component.css']
})
export class PortfolioStatsComponent implements OnInit {
  coinsWithTransList: Coin[] = [];

  constructor(private appStateService: AppStateService) { }

  ngOnInit(): void {
    this.appStateService.getCoinList().subscribe(updatedCoinList => {
      this.coinsWithTransList = updatedCoinList;
    });
  }

}
