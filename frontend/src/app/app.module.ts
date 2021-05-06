import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoinGraphsComponent } from './coin-graphs/coin-graphs.component';
import { CoinTableComponent } from './coin-table/coin-table.component';
import { CoinCardsComponent } from './coin-cards/coin-cards.component';
import { CoinTransactionsComponent } from './coin-transactions/coin-transactions.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { PortfolioStatsComponent } from './portfolio-stats/portfolio-stats.component';
import { AddCoinModalComponent } from './shared/modals/add-coin-modal/add-coin-modal.component';
import { AddTransactionModalComponent } from './shared/modals/add-transaction-modal/add-transaction-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BuyFormComponent } from './shared/modals/add-transaction-modal/buy-form/buy-form.component';
import { SellFormComponent } from './shared/modals/add-transaction-modal/sell-form/sell-form.component';
import { TransferFormComponent } from './shared/modals/add-transaction-modal/transfer-form/transfer-form.component';
import { TotalBalancePipe } from './shared/pipes/total-balance.pipe';
import { TotalProfitLossPipe } from './shared/pipes/total-profit-loss.pipe';
import { Change24hPipe } from './shared/pipes/change24h.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CoinGraphsComponent,
    CoinTableComponent,
    CoinCardsComponent,
    CoinTransactionsComponent,
    AccountSettingsComponent,
    NavigationBarComponent,
    PortfolioStatsComponent,
    AddCoinModalComponent,
    AddTransactionModalComponent,
    BuyFormComponent,
    SellFormComponent,
    TransferFormComponent,
    TotalBalancePipe,
    TotalProfitLossPipe,
    Change24hPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
