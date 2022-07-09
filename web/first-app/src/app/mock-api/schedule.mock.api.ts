import {ApiInjector, MockApiInterface, randomNumber, RequestOptions} from '@yunzhi/ng-mock-api';
import {HttpParams} from '@angular/common/http';
import {Schedule} from '../entity/schedule';
import {Page} from '../entity/page';

export class ScheduleMockApi implements MockApiInterface {
  getInjectors(): ApiInjector[] {
    return [
      {
        method: 'GET',
        url: '/schedule/page',
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
              teacher: {
                id: randomNumber()
              },
              term: {
                id: randomNumber()
              },
              course: {
                id: randomNumber(100)
              },
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
