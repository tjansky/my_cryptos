import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountSettingsComponent } from './portfolio/account-settings/account-settings.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { CoinCardsComponent } from './portfolio/coin-cards/coin-cards.component';
import { CoinGraphsComponent } from './portfolio/coin-graphs/coin-graphs.component';
import { CoinTableComponent } from './portfolio/coin-table/coin-table.component';
import { CoinTransactionsComponent } from './portfolio/coin-transactions/coin-transactions.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: '/portfolio/coin-table', pathMatch: 'full'},
  {path: 'auth', component: AuthenticationComponent,
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent}
    ]
},
  {path: 'portfolio', component: PortfolioComponent, canActivate: [AuthGuard], 
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
