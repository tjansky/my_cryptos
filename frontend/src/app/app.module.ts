import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoinGraphsComponent } from './portfolio/coin-graphs/coin-graphs.component';
import { CoinTableComponent } from './portfolio/coin-table/coin-table.component';
import { CoinCardsComponent } from './portfolio/coin-cards/coin-cards.component';
import { CoinTransactionsComponent } from './portfolio/coin-transactions/coin-transactions.component';
import { AccountSettingsComponent } from './portfolio/account-settings/account-settings.component';
import { NavigationBarComponent } from './portfolio/navigation-bar/navigation-bar.component';
import { PortfolioStatsComponent } from './portfolio/portfolio-stats/portfolio-stats.component';
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
import { TransactionTypePipe } from './shared/pipes/transaction-type.pipe';
import { AuthenticationComponent } from './authentication/authentication.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { JwtInterceptor } from './shared/interceptors/JwtInterceptor';
import { ErrorInterceptor } from './shared/interceptors/ErrorInterceptor';
import { Change24hPercentagePipe } from './shared/pipes/change24h-percentage.pipe';
import { TotalProfitLossPercentagePipe } from './shared/pipes/total-profit-loss-percentage.pipe';
import { PlusMinusPipe } from './shared/pipes/plus-minus.pipe';

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
    Change24hPipe,
    TransactionTypePipe,
    AuthenticationComponent,
    PortfolioComponent,
    LoginComponent,
    RegisterComponent,
    Change24hPercentagePipe,
    TotalProfitLossPercentagePipe,
    PlusMinusPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
