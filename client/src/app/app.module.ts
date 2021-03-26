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

@NgModule({
  declarations: [
    AppComponent,
    PortfolioComponent,
    CardAreaComponent,
    CoinCardComponent,
    CoinTableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    TooltipModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
