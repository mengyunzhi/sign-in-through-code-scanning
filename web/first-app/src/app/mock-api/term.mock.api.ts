import {ApiInjector, MockApiInterface, RequestOptions} from '@yunzhi/ng-mock-api';
import {Term} from '../entity/term';

export class TermMockApi implements MockApiInterface {
  getInjectors(): ApiInjector<any>[] {
    return [
      {
        method: 'GET',
        url: '/term/index',
        result: () => {
          return [
            {
              id: 1,
              state: 1,
              name: '2022春季学期',
              startTime: 1646928000,
              endTime: 1654963200
            } as Term,
            {
              id: 2,
              state: 0,
              name: '2021秋季学期',
              startTime: 1630425600,
              endTime: 1639756800
            } as Term,
            {
              id: 3,
              state: 0,
              name: '2021春季学期',
              startTime: 1615478400,
              endTime: 1623427200
            } as Term,
          ];
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
            startTime: 1646928000,
            endTime: 1654963200,
            state: 1,
          } as Term;
        }
      }
    ];
  }
}
