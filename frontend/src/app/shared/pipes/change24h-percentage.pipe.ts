import { Pipe, PipeTransform } from '@angular/core';
import { Coin } from '../models/Coin';

@Pipe({
  name: 'change24hPercentage',
  pure: false
})
export class Change24hPercentagePipe implements PipeTransform {

  transform(value: Coin[], ...args: unknown[]): unknown {
    let change24hpercentage = 0;
    let change24hcurrency = 0;
    let totalBalance = 0;

    value.forEach(
      c => {
        if(c.priceChange24hUsd){
          change24hcurrency += (c.holdings * c.priceChange24hUsd);
        }
        totalBalance += c.holdingsValueUsd;
      });

    change24hpercentage = ((change24hcurrency/totalBalance)*100)
    
    if(Number.isNaN(change24hpercentage)){
      return '+0';
    }
    else if(change24hpercentage > 0) {
      return '+'+change24hpercentage.toFixed(2);
    } 
    else {
      return change24hpercentage.toFixed(2);
    }

    
  }

}
