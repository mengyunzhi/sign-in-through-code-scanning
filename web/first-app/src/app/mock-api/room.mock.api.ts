import {ApiInjector, MockApiInterface, randomNumber, RequestOptions} from '@yunzhi/ng-mock-api';
import {HttpParams} from '@angular/common/http';
import {Page} from '../entity/page';
import {Room} from '../entity/room';

export class RoomMockApi implements MockApiInterface {
  getInjectors(): ApiInjector[] {
    return [
      {
        method: 'GET',
        url: '/room/page',
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

          const rooms: Room[] = [];
          rooms.push({
            id: 1,
            name: 'A101',
            capacity: 45,
            create_time: 1646928000,
            update_time: 1654963200
          } as Room);
          rooms.push({
            id: 2,
            name: 'A102',
            capacity: 50,
            create_time: 1630425600,
            update_time: 1639756800
          } as Room);
          rooms.push({
            id: 3,
            name: 'A103',
            capacity: 55,
            create_time: 1615478400,
            update_time: 1623427200
          } as Room);
          for (let i = 0; i < 10; i++) {
            rooms.push({
              id: i + 3,
              name: 'A10' + (i + 4).toString(),
              capacity: 55 + i,

              create_time: randomNumber(999999999),
              update_time: randomNumber(999999999),
            } as Room);
          }
          return new Page<Room>({
            content: rooms,
            number: page,
            size,
            numberOfElements: size * 20
          });
        }
      }
    ];
  }
}
