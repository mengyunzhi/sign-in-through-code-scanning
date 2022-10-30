import { Pipe, PipeTransform } from '@angular/core';
import {UserService} from '../service/user.service';
@Pipe({
  name: 'role'
})
export class RolePipe implements PipeTransform {

  transform(value: number): string{
    if (+value === UserService.ROLE_ADMIN) {
      return '管理员';
    } else if (+value === UserService.ROLE_TEACHER) {
      return '教师';
    } else if (+value === UserService.ROLE_STUDENT) {
      return '学生';
    } else {
      return '-';
    }
  }

}
