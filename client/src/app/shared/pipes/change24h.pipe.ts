import { Pipe, PipeTransform } from '@angular/core';
import { CoinAndTransactionsData } from '../models/CoinAndTransactionsData';

@Pipe({
  name: 'change24h',
  pure: false
})
export class Change24hPipe implements PipeTransform {

  transform(value: CoinAndTransactionsData[], ...args: unknown[]): unknown {
    let change24hcurrency = 0;
    value.forEach(x => {
      if(x.priceChange24hUsd){
        change24hcurrency = change24hcurrency + (x.holdings * x.priceChange24hUsd);
      };
    });

    return change24hcurrency;
  }

}
