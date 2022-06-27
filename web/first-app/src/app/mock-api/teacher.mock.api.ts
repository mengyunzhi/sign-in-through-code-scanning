import {ApiInjector, MockApiInterface, randomNumber, RequestOptions} from '@yunzhi/ng-mock-api';
import {HttpParams} from '@angular/common/http';
import {Page} from '../entity/page';
import {Teacher} from '../entity/teacher';

export class TeacherMockApi implements MockApiInterface {
  getInjectors(): ApiInjector[] {
    return [
      {
        method: 'GET',
        url: '/teacher/page',
        result: (urlMatches: string[], options: RequestOptions) => {
          let page = 0;
          let size = 20;
          const httpParams: HttpParams = options.params as HttpParams;
          console.log('get/term/page,mockAPi,', httpParams);
          if (httpParams.has('page')) {
            page = +(httpParams.get('page') as string);
          }

          if (httpParams.get('size')) {
            size = +(httpParams.get('size') as string);
          }

          const teachers: Teacher[] = [];
          teachers.push({
            id: 1,
            name: '教师1',
            sex: 1,
            number: (randomNumber(9999999999) + 10000000000).toString(),
            create_time: 1646928000,
            update_time: 1654963200
          } as Teacher);
          teachers.push({
            id: 2,
            name: '教师2',
            sex: 1,
            number: (randomNumber(9999999999) + 10000000000).toString(),
            create_time: 1630425600,
            update_time: 1639756800
          } as Teacher);
          teachers.push({
            id: 3,
            name: '教师3',
            sex: 1,
            number: (randomNumber(9999999999) + 10000000000).toString(),
            create_time: 1615478400,
            update_time: 1623427200
          } as Teacher);
          for (let i = 0; i < 7; i++) {
            teachers.push({
              id: i + 3,
              name: '教师' + (i + 4).toString(),
              sex: 1,
              number: (randomNumber(9999999999) + 10000000000).toString(),
              create_time: randomNumber(999999999),
              update_time: randomNumber(999999999),
            } as Teacher);
          }
          return new Page<Teacher>({
            content: teachers,
            number: page,
            size,
            numberOfElements: size * 20
          });
        }
      }
    ];
  }
}
