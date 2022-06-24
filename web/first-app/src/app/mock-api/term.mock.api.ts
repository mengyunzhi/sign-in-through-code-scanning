import {ApiInjector, MockApiInterface, randomNumber, RequestOptions} from '@yunzhi/ng-mock-api';
import {Term} from '../entity/term';
import {HttpParams} from '@angular/common/http';
import {Page} from '../entity/page';

export class TermMockApi implements MockApiInterface {
  getInjectors(): ApiInjector[] {
    return [
      {
        method: 'GET',
        url: '/term/page',
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

          const terms: Term[] = [];
          terms.push({
            id: 1,
            state: 1,
            name: '2022春季学期',
            start_time: 1646928000,
            end_time: 1654963200
          } as Term);
          terms.push({
            id: 2,
            state: 0,
            name: '2021秋季学期',
            start_time: 1630425600,
            end_time: 1639756800
          } as Term);
          terms.push({
            id: 3,
            state: 0,
            name: '2021春季学期',
            start_time: 1615478400,
            end_time: 1623427200
          } as Term);
          for (let i = 0; i < 7; i++) {
            terms.push({
              id: i + 3,
              state: 0,
              name: '测试学期' + (i + 3).toString(),
              start_time: randomNumber(999999999),
              end_time: randomNumber(999999999),
            } as Term);
          }
          return new Page<Term>({
            content: terms,
            number: page,
            size,
            numberOfElements: size * 20
          });
        }
      },
      {
        method: 'GET',
        url: '/term/(\\d+)',
        result: (urlMatches: string[], options: RequestOptions) => {
          const id = +urlMatches[1];
          return {
            id,
            name: '2022春季学期',
            start_time: 1646928000,
            end_time: 1654963200,
            state: 1,
          } as Term;
        }
      }
    ];
  }
}
