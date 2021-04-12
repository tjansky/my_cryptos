import { Pipe, PipeTransform } from '@angular/core';
import { CoinAndTransactionsData } from '../models/CoinAndTransactionsData';

@Pipe({
  name: 'totalProfitLoss',
  pure: false
})
export class TotalProfitLossPipe implements PipeTransform {

  transform(value: CoinAndTransactionsData[], ...args: unknown[]): unknown {
    let totalProfitLoss = 0;
    value.forEach(x => {
      totalProfitLoss += x.profitLoss;
    });

    return totalProfitLoss;
  }

}
