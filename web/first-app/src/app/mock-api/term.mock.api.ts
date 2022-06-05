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
              name: '2022春季学期',
              startTime: 1646928000,
              endTime: 1654963200
            },
            {
              id: 2,
              state: false,
              name: '2021秋季学期',
              startTime: 1630425600,
              endTime: 1639756800
            },
            {
              id: 3,
              state: false,
              name: '2021春季学期',
              startTime: 1615478400,
              endTime: 1623427200
            }
          ];
        }
      }
    ];
  }
}
