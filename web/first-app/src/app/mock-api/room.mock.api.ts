import {ApiInjector, MockApiInterface, randomNumber, RequestOptions} from '@yunzhi/ng-mock-api';
import {HttpParams} from '@angular/common/http';
import {Room} from '../entity/room';
import {Page} from '../entity/page';

export class RoomMockApi implements MockApiInterface {
  getInjectors(): ApiInjector[] {
    return [
      {
        method: 'GET',
        url: '/room/page',
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
          const rooms = [] as Room[];
          for (let i = 0; i < size; i++) {
            rooms.push({
              id: i + 1,
              name: '测试教室' + randomNumber(100).toString(),
              capacity: randomNumber(100),
            } as Room);
          }
          return new Page<Room>({
            content: rooms,
            size,
            number: page,
            numberOfElements: 20 * size
          });
        }
      }
    ];
  }
}
