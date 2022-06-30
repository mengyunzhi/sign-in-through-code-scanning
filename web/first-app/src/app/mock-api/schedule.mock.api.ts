import {ApiInjector, MockApiInterface, randomNumber, RequestOptions} from '@yunzhi/ng-mock-api';
import {HttpParams} from '@angular/common/http';
import {Schedule} from '../entity/schedule';
import {Page} from '../entity/page';

export class ScheduleMockApi implements MockApiInterface {
  getInjectors(): ApiInjector[] {
    return [
      {
        method: 'GET',
        url: '/task/page',
        result: (urlMatches: string[], option: RequestOptions) => {
          let size = 20;
          let page = 0;

          const httpParams = option.params as HttpParams;
          if (httpParams.has('size')) {
            size = +(httpParams.get('size') as string);
          }
          if (httpParams.has('page')) {
            page = +(httpParams.get('page') as string);
          }

          const schedules = [] as Schedule[];
          for (let i = 0; i < size; i++) {
            schedules.push({
              id: i + 1,
              teacher_id: randomNumber(),
              term_id: randomNumber(),
              course_id: randomNumber(100),
              test_course_name: '测试课程' + randomNumber(100).toString(),
              test_term_name: '测试学期' + randomNumber(100).toString(),
              test_clazz_name: '测试班级' + randomNumber(100).toString(),
            } as Schedule);
          }
          return new Page<Schedule>({
            content: schedules,
            number: page,
            size,
            numberOfElements: size * 20,
          });
        }
      }
    ];
  }
}
