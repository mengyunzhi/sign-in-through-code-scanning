import {ApiInjector, MockApiInterface, randomNumber, RequestOptions} from '@yunzhi/ng-mock-api';
import {HttpParams} from '@angular/common/http';
import {User} from '../entity/user';
import {UserService} from '../service/user.service';

export class UserMockApi implements MockApiInterface {
  getInjectors(): ApiInjector[] {
    return [
      {
        method: 'GET',
        url: '/user/login',
        description: '登录',
        result: (urlMatches: string[], option: RequestOptions) => {
          const httpParams = option.params as HttpParams;
          // tslint:disable-next-line:variable-name
          const number = httpParams.get('number');
          console.log('mock api of user/login');

          if (number === 'admin') {
            return {
              role: UserService.ROLE_ADMIN,
              name: '管理员',
              number: 'admin'
            } as User;
          } else if (number === 'teacher') {
            return {
              role: UserService.ROLE_TEACHER,
              name: '教师',
              number: 'teacher'
            } as User;
          } else if (number === 'student') {
            return {
              role: UserService.ROLE_STUDENT,
              name: '学生',
              number: 'student'
            } as User;
          }
          return {
            name: 'error',
          } as User;
        }
      }
    ];
  }
}
