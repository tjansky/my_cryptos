import { Pipe, PipeTransform } from '@angular/core';
import { Coin } from '../models/Coin';

@Pipe({
  name: 'totalProfitLoss',
  pure: false
})
export class TotalProfitLossPipe implements PipeTransform {

  transform(value: Coin[], ...args: unknown[]): unknown {
    let totalProfitLoss = 0;
    value.forEach(x => {
      if(x.profitLoss){
        totalProfitLoss += x.profitLoss;
      };
    });

    return totalProfitLoss;
  }

}
