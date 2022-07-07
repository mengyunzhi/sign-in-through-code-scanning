import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Clazz} from '../entity/clazz';
import {Page} from '../entity/page';
import {map} from 'rxjs/operators';
import {Student} from '../entity/student';

@Injectable({
  providedIn: 'root'
})
export class ClazzService {
  private baseUrl = 'clazz';

  constructor(protected httpClient: HttpClient) {
  }

  add(data: {name: string, entrance_date: string, length: number}): Observable<any> {
    return this.httpClient.post('/clazz/add', data);
  }

  clazzMembers(clazz_id: number, page: number, size: number): Observable<Page<Student>> {
    const httpParams = new HttpParams()
      .append('page', page.toString())
      .append('size', size.toString());
    return this.httpClient
      .get<{length: number, content: Student[]}>('/clazz/clazzMembers/clazz_id/' + clazz_id.toString(), {params: httpParams})
      .pipe(map(data => {
        return new Page<Student>({
          content: data.content,
          number: page,
          size,
          numberOfElements: data.length
        });
      }));
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete('/clazz/delete/id/' + id.toString());
  }

  getById(id: number): Observable<any> {
    return this.httpClient.get('/clazz/getById/id/' + id.toString());
  }

  /**
   * 获取所有的班级
   */
  getAll(): Observable<Clazz[]> {
    return this.httpClient.get<Array<Clazz>>('/clazz/getAll');
  }

  page(page: number, size: number): Observable<Page<Clazz>> {
    const httpParams = new HttpParams()
      .append('page', page.toString())
      .append('size', size.toString());
    return this.httpClient
      .get<{length: number, content: Clazz[]}>
      ('/clazz/page', {params: httpParams})
      .pipe(map(data => {
        return new Page<Clazz>({
          content: data.content,
          number: page,
          size,
          numberOfElements: data.length
        });
      }));
  }

  update(id: number, data: {name: string, entrance_date: string, length: number}): Observable<any> {
    return this.httpClient.post('/clazz/update/id/' + id.toString(), data);
  }

}
