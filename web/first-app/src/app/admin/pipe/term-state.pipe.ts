import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'termState'
})
export class TermStatePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
