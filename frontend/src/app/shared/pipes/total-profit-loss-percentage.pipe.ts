import { Pipe, PipeTransform } from '@angular/core';
import { Coin } from '../models/Coin';

@Pipe({
  name: 'totalProfitLossPercentage',
  pure: false
})
export class TotalProfitLossPercentagePipe implements PipeTransform {

  transform(value: Coin[], ...args: unknown[]): unknown {
    let totalProfitLoss = 0;
    let totalBalance = 0;

    value.forEach(x => {
      if(x.profitLoss){
        totalProfitLoss += x.profitLoss;
        totalBalance += x.holdingsValueUsd;
      };
    });

    let totalProfitLossPercentage = (totalProfitLoss/totalBalance)*100;

    if(Number.isNaN(totalProfitLossPercentage)){
      return '+0';
    }
    else if(totalProfitLossPercentage > 0) {
      return '+'+totalProfitLossPercentage.toFixed(2);
    } 
    else {
      return totalProfitLossPercentage.toFixed(2);
    }
  }

}
