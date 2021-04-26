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

@NgModule({
  declarations: [
    AppComponent,
    CoinGraphsComponent,
    CoinTableComponent,
    CoinCardsComponent,
    CoinTransactionsComponent,
    AccountSettingsComponent,
    NavigationBarComponent,
    PortfolioStatsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
