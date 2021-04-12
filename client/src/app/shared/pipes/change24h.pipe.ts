import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'change24h'
})
export class Change24hPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
