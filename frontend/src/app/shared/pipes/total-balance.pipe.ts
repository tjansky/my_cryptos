import { Pipe, PipeTransform } from '@angular/core';
import { Coin } from '../models/Coin';

@Pipe({
  name: 'totalBalance',
  pure: false
})
export class TotalBalancePipe implements PipeTransform {

  transform(value: Coin[], ...args: unknown[]): unknown {
    let totalBalance = 0;
    value.forEach(x => {
      if(x.holdingsValueUsd){
        totalBalance += x.holdingsValueUsd;
      };
    })

    return totalBalance;
  }

}
