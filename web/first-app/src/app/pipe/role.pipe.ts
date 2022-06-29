import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'role'
})
export class RolePipe implements PipeTransform {

  transform(value: number): string{
    if (value === 0) {
      return '管理员';
    } else if (value === 1) {
      return '教师';
    } else if (value === 2) {
      return '学生';
    } else {
      return '-';
    }
  }

}
