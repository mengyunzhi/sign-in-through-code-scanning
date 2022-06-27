import {ApiInjector, MockApiInterface, randomNumber, randomString} from '@yunzhi/ng-mock-api';
import {Clazz} from '../entity/clazz';

export class ClazzMockApi implements MockApiInterface {
  getInjectors(): ApiInjector[] {
    return [{
      method: 'GET',
      url: 'clazz',
      result: () => {
        const clazzes = [] as Clazz[];
        for (let i = 0; i < 10; i++) {
          clazzes.push({
            id: i,
            name: '班级' + (i + 1),
          } as Clazz);
        }
        return clazzes;
      }
    }
    ];
  }
}
