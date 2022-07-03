import {Observable, of} from 'rxjs';
import {Teacher} from '../entity/teacher';
import {Page} from '../entity/page';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';

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
    return this.httpClient.delete<any>('/teacher/delete/id/' + id.toString());
  }

  getById(id: number): Observable<Teacher> {
    return this.httpClient.get<Teacher>('/teacher/getById/id/' + id.toString());
  }

  page(page: number, size: number): Observable<Page<Teacher>> {
    const httpParams = new HttpParams()
      .append('page', page.toString())
      .append('size', size.toString());
    return new Observable<Page<Teacher>>(subscriber => {
        this.httpClient.get<any>('/teacher/page', {params: httpParams})
          .subscribe(data => {
            console.log('teacher api 请求成功', data);
            subscriber.next(new Page<Teacher>({
              content: data.content,
              number: page,
              size,
              numberOfElements: data.length
            }));
          }, error => console.log('教师api请求失败', error));
      }
    );
  }

  update(id: number, data: {name: string, sex: number, number: string}): Observable<any> {
    return this.httpClient.post<any>('/teacher/update/id/' + id.toString(), data);
  }

  updatePasswordByAdmin(id: number, password: string): Observable<any> {
    console.log('service');
    return this.httpClient.post<any>('/teacher/updatePasswordByAdmin/id/' + id.toString(), password);
  }

}
