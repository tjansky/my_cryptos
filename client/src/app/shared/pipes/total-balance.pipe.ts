import { Pipe, PipeTransform } from '@angular/core';
import { CoinAndTransactionsData, ITransaction } from '../models/CoinAndTransactionsData';

@Pipe({
  name: 'totalBalance',
  pure: false
})
export class TotalBalancePipe implements PipeTransform {

  transform(value: CoinAndTransactionsData[], ...args: unknown[]): unknown {
    // let allTransactions: ITransaction[] = [];
    // value.forEach(c => {
    //   allTransactions.push(...c.transactions);
    // });
    
    let totalBalance = 0;
    value.forEach(x => {
      if(x.holdingsValueUsd){
        totalBalance += x.holdingsValueUsd;
      };
    })

    return totalBalance;
  }

}
