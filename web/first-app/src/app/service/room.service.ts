import { Injectable } from '@angular/core';
import {observable, Observable, of} from 'rxjs';
import {Page} from '../entity/page';
import {Room} from '../entity/room';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private httpClient: HttpClient) { }

  /*
  * 管理端教室管理index页面
  * */
  page({page = 0,  size = 20}: {page?: number, size?: number }): Observable<Page<Room>> {
    console.log('222222222222');
    let rooms = [] as Room[];
    return new Observable<Page<Room>>(
      subscriber => {
        const httpParams = new HttpParams()
          .append('page', size.toString())
          .append('size', size.toString());
        this.httpClient.get<any>('/room/page', {params: httpParams})
          .subscribe(data => {
            rooms = data.content;
            subscriber.next(new Page<Room>({
              content: rooms,
              number: page,
              size,
              numberOfElements: data.length
            }));
          }, error => {
            console.log('请求失败', error);
          });
      });
  }
}
