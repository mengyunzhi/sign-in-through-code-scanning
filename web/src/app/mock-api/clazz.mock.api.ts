import {ApiInjector, MockApiInterface, randomNumber, randomString, RequestOptions} from '@yunzhi/ng-mock-api';
import {Clazz} from '../entity/clazz';
import {HttpParams} from '@angular/common/http';
import {Room} from '../entity/room';
import {Page} from '../entity/page';
import {Term} from '../entity/term';

export class ClazzMockApi implements MockApiInterface {
  getInjectors(): ApiInjector[] {
    return [
        {
        method: 'GET',
        url: '/clazz/page',
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
          const clazzes = [] as Clazz[];
          for (let i = 0; i < size; i++) {
            clazzes.push({
              id: i + 1,
              name: '测试班级' + randomNumber(100).toString(),
              entrance_date: randomNumber(999999999).toString(),
              length: randomNumber(9) + 1,
            } as Clazz);
          }
          return new Page<Clazz>({
            content: clazzes,
            size,
            number: page,
            numberOfElements: 20 * size
          });
        }
      },
      {
        method: 'GET',
        url: 'clazz',
        description: 'getAll() 获取所有班级',
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
      },
      {
        method: 'GET',
        url: '/clazz/(\\d+)',
        result: (urlMatches: string[], options: RequestOptions) => {
          const id = +urlMatches[1];
          return {
            id,
            name: '软件201',
            entrance_date: '1646928000',
            length: randomNumber(6)
          } as Clazz;
        }
      }
    ];
  }
}
