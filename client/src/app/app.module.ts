import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { AppComponent } from './app.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { CardAreaComponent } from './portfolio/card-area/card-area.component';
import { CoinCardComponent } from './portfolio/card-area/coin-card/coin-card.component';
import { FormsModule } from '@angular/forms';
import { CoinTableComponent } from './portfolio/coin-table/coin-table.component';
import { AddCoinModalComponent } from './shared/components/modals/add-coin-modal/add-coin-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common';
import { AddCoinModalContentComponent } from './shared/components/modals/add-coin-modal/add-coin-modal-content/add-coin-modal-content.component';
import { PortfolioOverviewComponent } from './portfolio/portfolio-overview/portfolio-overview.component';
import { TotalBalancePipe } from './shared/pipes/total-balance.pipe';
import { Change24hPipe } from './shared/pipes/change24h.pipe';
import { TotalProfitLossPipe } from './shared/pipes/total-profit-loss.pipe';
import { TransactionsDetailsComponent } from './transactions/transactions-details.component';

@NgModule({
  declarations: [
    AppComponent,
    PortfolioComponent,
    CardAreaComponent,
    CoinCardComponent,
    CoinTableComponent,
    AddCoinModalComponent,
    AddCoinModalContentComponent,
    PortfolioOverviewComponent,
    TotalBalancePipe,
    Change24hPipe,
    TotalProfitLossPipe,
    TransactionsDetailsComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    TooltipModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
