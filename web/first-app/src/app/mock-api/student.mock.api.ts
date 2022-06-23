import {ApiInjector, MockApiInterface, randomNumber, RequestOptions} from '@yunzhi/ng-mock-api';
import {HttpParams} from '@angular/common/http';
import {Student} from '../entity/student';
import {randomBoolean, randomString} from '@yunzhi/ng-mock-api/testing';
import {Page} from '../entity/page';

export class StudentMockApi implements MockApiInterface {
  getInjectors(): ApiInjector<any>[] {
    return [
      // 分页
      {
        method: 'GET',
        url: '/student/page',
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
            students.push(new Student({
              id: i,
              name: randomString('学生'),
              sex: randomBoolean(),
              clazzName: randomString('班级'),
              sno: randomNumber(),
            }));
          }

          return new Page<Student>({
            content: students,
            number: page,
            size,
            numberOfElements: size * 10
          });
        }
      }
    ];
  }
}
