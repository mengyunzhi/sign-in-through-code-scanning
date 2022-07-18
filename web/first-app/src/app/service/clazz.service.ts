import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Clazz} from '../entity/clazz';
import {Page} from '../entity/page';
import {map} from 'rxjs/operators';
import {Student} from '../entity/student';
import {User} from '../entity/user';

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

  clazzesHaveSelectCourse(course_id: number): Observable<number[]> {
    return this.httpClient.get<number[]>('/clazz/clazzesHaveSelectCourse/course_id/' + course_id.toString());
  }

  clazzMembers(clazz_id: number, page: number, size: number): Observable<Page<Student>> {
    const httpParams = new HttpParams()
      .append('page', page.toString())
      .append('size', size.toString());
    return this.httpClient
      .get<{length: number, content: {user_id: number, name: string, sex: number, sno: number}[]}>
      ('/clazz/clazzMembers/clazz_id/' + clazz_id.toString(), {params: httpParams})
      .pipe(map(data => {
        console.log('clazzservice', data);
        const content = [] as Student[];
        for (const student of data.content) {
          content.push({
            user: {
              id: student.user_id,
              name: student.name,
              sex: student.sex,
            } as User,
            sno: student.sno
          } as Student);
        }
        return new Page<Student>({
          content,
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

  page({page = 0, size = 3}: {page?: number, size?: number}, param: {name?: string}): Observable<Page<Clazz>> {
    const httpParams = new HttpParams()
      .append('page', page.toString())
      .append('size', size.toString())
      .append('searchName', param.name as string);
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

  getClazzesByScheduleId(scheduleIdOfDispatchConflictClazzes: any[]): Observable<Array<Clazz>> {
    return this.httpClient.post<Array<Clazz>>('/schedule/getClazzesByScheduleId', scheduleIdOfDispatchConflictClazzes);
  }

}
