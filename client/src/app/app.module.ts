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
import { AddCoinModalComponent, ModalContentComponent } from './shared/components/add-coin-modal/add-coin-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    PortfolioComponent,
    CardAreaComponent,
    CoinCardComponent,
    CoinTableComponent,
    AddCoinModalComponent,
    ModalContentComponent
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
