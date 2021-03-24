import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { CardAreaComponent } from './portfolio/card-area/card-area.component';
import { CoinCardComponent } from './portfolio/card-area/coin-card/coin-card.component';

@NgModule({
  declarations: [
    AppComponent,
    PortfolioComponent,
    CardAreaComponent,
    CoinCardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
