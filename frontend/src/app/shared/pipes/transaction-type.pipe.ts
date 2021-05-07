import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transactionType'
})
export class TransactionTypePipe implements PipeTransform {

  transform(value: number): string {
    let typeName = '';

    switch (value) {
      case 1:
        typeName = 'Buy';
        break;
      case 2:
        typeName = 'Sell';
        break;
      case 3:
        typeName = 'Transfer In';
        break;
      case 4:
        typeName = 'Transfer Out';
        break;
    }

    return typeName;
  }

}
