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

  getById(id: number): Observable<Room> {
    return this.httpClient
      .get<Room>(`/room/getById/id/` + id.toString());
  }

  /*
  * 管理端教室管理index页面
  * */
  page({page = 0, size = 5}: { size?: number; page?: number }, param: {name?: string, capacity?: string}): Observable<Page<Room>> {
    let rooms = [] as Room[];
    return new Observable<Page<Room>>(
      subscriber => {
        const httpParams = new HttpParams()
          .append('page', page.toString())
          .append('size', size.toString())
          .append('searchName', param.name ? param.name : '')
          .append('searchCapacity', param.capacity ? param.capacity : '');
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

  /*
  * 删除教室
  * */
  delete(id: number): Observable<Room> {
    console.log('delete');
    return this.httpClient
      .delete<Room>('/room/delete/id/' + id.toString());
  }

  /*
  * 新增教室
  * */
  add(data: { name: string; capacity: number }): Observable<Room> {
    console.log('添加教室');
    const room = {
      name: data.name,
      capacity: data.capacity
    } as Room;
    console.log(room);
    console.log('11111');
    console.log(this.httpClient.post<Room>('/room/add', room));
    console.log('22222222222');
    return this.httpClient.post<Room>('/room/add', room);
  }

  /*
  * 编辑教室
  * */
  update(id: number, room: { name: any; capacity: any }): Observable<any> {
    return this.httpClient
      .post<any>('/room/update/id/' + id.toString(), room);
  }
}
