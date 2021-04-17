import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { TransactionsDetailsComponent } from './transactions/transactions-details.component';

const routes: Routes = [
  { path: '', component: PortfolioComponent },
  { path: ':id', component: TransactionsDetailsComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
