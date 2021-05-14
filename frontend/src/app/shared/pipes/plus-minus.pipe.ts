import { ElementRef, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plusMinus'
})
export class PlusMinusPipe implements PipeTransform {

  transform(value: string): unknown {
      if(value.startsWith('+'))
        return "plusPercentage";
      else 
        return "minusPercentage";
  }

}
