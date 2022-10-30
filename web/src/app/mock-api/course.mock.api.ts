import {ApiInjector, MockApiInterface, randomNumber, RequestOptions} from '@yunzhi/ng-mock-api';
import {HttpParams} from '@angular/common/http';
import {Page} from '../entity/page';
import {Course} from '../entity/course';

export class CourseMockApi implements MockApiInterface {
  getInjectors(): ApiInjector[] {
    return [
      {
        method: 'GET',
        url: '/course/page',
        description: 'room 分页查询',
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
          const courses = [] as Course[];
          for (let i = 0; i < size; i++) {
            courses.push({
              id: i + 1,
              name: '测试课程' + randomNumber(100).toString(),
              lesson: randomNumber(100),
            } as Course);
          }
          return new Page<Course>({
            content: courses,
            size,
            number: page,
            numberOfElements: 20 * size
          });
        }
      }
    ];
  }
}
