import {ApiInjector, MockApiInterface} from '@yunzhi/ng-mock-api';

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
              state: true,
              name: '春季学期',
              startTime: 1123123,
              endTime: 4222222
            },
            {
              id: 2,
              state: false,
              name: '秋季学期',
              startTime: 1112333,
              endTime: 1242424
            }
          ];
        }
      }
    ];
  }
}
