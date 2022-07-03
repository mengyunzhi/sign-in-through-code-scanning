import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sex'
})
export class SexPipe implements PipeTransform {

  transform(value: number): string {
    if (value === null || value === undefined) {
      return '-';
    }
    if (value === 1) {
      return '女';
    } else {
      return '男';
    }
  }

}
