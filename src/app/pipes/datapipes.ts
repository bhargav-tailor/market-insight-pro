import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'number'
})
export class NumberPipe implements PipeTransform {
  transform(value: any, attribute:string ): any {
    return (value[attribute]||[]);
  }
}
