import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { CoinCardsComponent } from './coin-cards/coin-cards.component';
import { CoinGraphsComponent } from './coin-graphs/coin-graphs.component';
import { CoinTableComponent } from './coin-table/coin-table.component';
import { CoinTransactionsComponent } from './coin-transactions/coin-transactions.component';
import { PortfolioComponent } from './portfolio/portfolio.component';

const routes: Routes = [
  {path: '', component: CoinTableComponent},
  {path: 'auth', component: AuthenticationComponent},
  {path: 'portfolio', component: PortfolioComponent, 
    children: [
      {path: '', component: CoinTableComponent},
      {path: 'coin-table', component: CoinTableComponent},
      {path: 'coin-cards', component: CoinCardsComponent},
      {path: 'coin-graphs', component: CoinGraphsComponent},
      {path: 'transactions/:id', component: CoinTransactionsComponent}
    ]
  },

  // {path: 'coin-cards', component: CoinCardsComponent},
  // {path: 'coin-table', component: CoinTableComponent},
  // {path: 'coin-graphs', component: CoinGraphsComponent},
  // {path: 'transactions/:id', component: CoinTransactionsComponent},
  // {path: 'account-settings', component: AccountSettingsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
