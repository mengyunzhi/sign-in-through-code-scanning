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
    return this.httpClient.get<number[]>('/clazz/clazzesHaveSelectCourse/' + course_id.toString());
  }

  clazzMembers(clazz_id: number, page: number, size: number, param: {name?: string, sno?: string}): Observable<Page<Student>> {
    const httpParams = new HttpParams()
      .append('page', page.toString())
      .append('size', size.toString())
      .append('searchName', param.name ? param.name : '')
      .append('searchSno', param.sno ? param.sno : '');
    return this.httpClient
      .get<{totalElements: number, content: Student[]}>
      ('/clazz/clazzMembers/' + clazz_id.toString(), {params: httpParams})
      .pipe(map(data => {
        // console.log('clazzservice', data);
        const content = data.content;
        return new Page<Student>({
          content,
          number: page,
          size,
          numberOfElements: data.totalElements
        });
      }));
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete('/clazz/delete/' + id.toString());
  }

  getById(id: number): Observable<any> {
    return this.httpClient.get('/clazz/getById/' + id.toString());
  }

  /**
   * 获取所有的班级
   */
  getAll(): Observable<Clazz[]> {
    return this.httpClient.get<Array<Clazz>>('/clazz/getAll');
  }

  page({page = 0, size = 2}: {page?: number, size?: number}, param: {name?: string}): Observable<Page<Clazz>> {
    let clazzes = [] as Clazz[];
    return new Observable<Page<Clazz>>(
      subscriber => {
        const httpParams = new HttpParams()
          .append('page', page.toString())
          .append('size', size.toString())
          .append('searchName', param.name ? param.name : '');
        this.httpClient.get<any>('/clazz/page', {params: httpParams})
          .subscribe(data => {
            clazzes = data.content;
            subscriber.next(new Page<Clazz>({
              content: clazzes,
              number: page,
              size,
              numberOfElements: data.totalElements
            }));
          }, error => {
            console.log('请求失败', error);
          });
      });
  }

  update(id: number, data: {name: string, entrance_date: string, length: number}): Observable<any> {
    return this.httpClient.post('/clazz/update/' + id.toString(), data);
  }

  getClazzesByScheduleId(scheduleIdOfDispatchConflictClazzes: any[]): Observable<Array<Clazz>> {
    return this.httpClient.post<Array<Clazz>>('/schedule/getClazzesByScheduleIds', scheduleIdOfDispatchConflictClazzes);
  }
  getClazzesByCourseId(courseId: number): Observable<Array<Clazz>> {
    return this.httpClient.get<Array<Clazz>>('/clazz/getClazzesByCourseId/' + courseId);
  }

  removeClazzFromSchedule(clazzId: number, scheduleId: number | undefined): Observable<void> {
    const data = [];
    data[0] = scheduleId;
    data[1] = clazzId;
    return this.httpClient.post<void>('/schedule/removeClazzFromSchedule', data);
  }

}
