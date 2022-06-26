import {ApiInjector, MockApiInterface, randomNumber, RequestOptions} from '@yunzhi/ng-mock-api';
import {HttpParams} from '@angular/common/http';
import {Student} from '../entity/student';
import {Page} from '../entity/page';

export class StudentMockApi implements MockApiInterface {
  getInjectors(): ApiInjector[] {
    return [
      {
        method: 'GET',
        url: '/student/page',
        description: 'page 分页查询',
        result: (urlMatches: string[], option: RequestOptions) => {
          // 初始化两个默认值
          let page = 0;
          let size = 20;

          const httpParams = option.params as HttpParams;
          if (httpParams.has('page')) {
            page = +(httpParams.get('page') as string);
          }
          if (httpParams.has('size')) {
            size = +(httpParams.get('size') as string);
          }

          const students = new Array<Student>();
          for (let i = 0; i < size; i++) {
            students.push({
              id: i,
              name: '学生' + randomNumber(100).toString(),
              sex: (randomNumber(100) % 2),
              clazz_id: randomNumber(10),
              sno: randomNumber(),
            } as Student);
          }

          return new Page<Student>({
            content: students,
            number: page,
            size,
            numberOfElements: size * 10
          });
        }
      },
      {
        method: 'GET',
        url: '/task/viewStudent/page',
        result: (urlMatches: string[], option: RequestOptions) => {
          let size = 10;
          let page = 0;

          const httpParams = option.params as HttpParams;
          if (httpParams.has('size')) {
            size = +(httpParams.get('size') as string);
          }
          if (httpParams.has('page')) {
            page = +(httpParams.get('page') as string);
          }
          const students = [] as Student[];
          for (let i = 0; i < size; i++) {
            students.push({
              id: i + 1,
              name: '测试学生' + randomNumber(100).toString(),
              sex: randomNumber() % 2,
              user_id: randomNumber(100),
              clazz_id: randomNumber(100),
              sno: randomNumber(99999) + (randomNumber(9) + 1) * 100000,
              state: randomNumber(100) % 2,
            } as Student);
          }
          return new Page<Student>({
            content: students,
            size,
            number: page,
            numberOfElements: size * 20,
          });
        }
      }
    ];
  }
}
