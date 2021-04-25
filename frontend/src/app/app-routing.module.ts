import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { CoinCardsComponent } from './coin-cards/coin-cards.component';
import { CoinGraphsComponent } from './coin-graphs/coin-graphs.component';
import { CoinTableComponent } from './coin-table/coin-table.component';
import { CoinTransactionsComponent } from './coin-transactions/coin-transactions.component';

const routes: Routes = [
  {path: '', component: CoinTableComponent},
  {path: 'coin-cards', component: CoinCardsComponent},
  {path: 'coin-table', component: CoinTableComponent},
  {path: 'coin-graphs', component: CoinGraphsComponent},
  {path: 'transactions/:id', component: CoinTransactionsComponent},
  {path: 'account-settings', component: AccountSettingsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
