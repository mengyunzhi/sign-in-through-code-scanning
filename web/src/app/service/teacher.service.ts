import {Observable, of} from 'rxjs';
import {Teacher} from '../entity/teacher';
import {Page} from '../entity/page';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {User} from '../entity/user';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private httpClient: HttpClient) {
  }

  add(data: {name: string, sex: number, number: string}): Observable<any> {
    return this.httpClient.post<any>('/teacher/add', data);
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete<any>('/teacher/delete/' + id.toString());
  }

  getById(id: number): Observable<Teacher> {
    return this.httpClient.get<Teacher>('/teacher/getById/' + id.toString());
  }

  page({page = 0, size = 2}: { size?: number; page?: number }, param: {name?: string, phone?: string}): Observable<Page<Teacher>> {

    const httpParams = new HttpParams()
      .append('page', page.toString())
      .append('size', size.toString())
      .append('name', param.name ? param.name : '')
      .append('number', param.phone ? param.phone : '');
    return this.httpClient
      .get<{length: number, content: Teacher[], totalElements: number}>
      ('/teacher/page', {params: httpParams})
      .pipe(map(data => {
        return new Page<Teacher>({
          content: data.content,
          number: page,
          size,
          numberOfElements: data.totalElements
        });
      }));
  }

  update(id: number, data: {name: string, sex: number, number: string}): Observable<any> {
    console.log('update', data);
    return this.httpClient.post<any>('/teacher/update/' + id.toString(), data);
  }

  updatePasswordByAdmin(id: number, password: string): Observable<any> {
    console.log('service');
    return this.httpClient.post<any>('/teacher/updatePasswordByAdmin/' + id.toString(), password);
  }
}
