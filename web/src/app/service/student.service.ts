import {Observable} from 'rxjs';
import {Student} from '../entity/student';
import {Page} from '../entity/page';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {User} from '../entity/user';
import {Clazz} from '../entity/clazz';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private httpClient: HttpClient) {
  }


  page({page = 0, size = 2}: {size?: number; page?: number},
       param: {clazz?: string, name?: string, sno?: string}): Observable<Page<Student>> {
    const httpParams = new HttpParams()
      .append('page', page.toString())
      .append('size', size.toString())
      .append('searchClazz', param.clazz ? param.clazz : '')
      .append('searchName', param.name ? param.name : '')
      .append('searchSno', param.sno ? param.sno : '');
    return this.httpClient.get<{length: number, content: T[]}>('/student/page', {params: httpParams})
      .pipe(map(data => {
        const content = [] as Student[];
        for (const student of data.content) {
          content.push({
            id: student.id,
            state: student.state,
            user: {
              id: student.user_id,
              number: student.number,
              sex: student.sex,
              name: student.name,
            } as User,
            sno: student.sno.toString(),
            clazz: {
              id: student.clazz_id,
              name: student.clazz_name
            } as Clazz,
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

  pageByScheduleId(page: number, size: number, schedule_id: number, query: {clazz: string, name: string, sno: string}):
    Observable<Page<Student>> {
    const httpParams = new HttpParams()
      .append('page', page.toString())
      .append('size', size.toString())
      .append('clazz', query.clazz)
      .append('name', query.name)
      .append('sno', query.sno);
    return this.httpClient.get<{length: number, content: T[]}>('/student/pageByScheduleId/schedule_id/' + schedule_id, {params: httpParams})
      .pipe(map(data => {
        console.log('studentService pageByScheduleId', data);
        const content = [] as Student[];
        for (const student of data.content) {
          content.push({
            id: student.id,
            sno: student.sno.toString(),
            user: {
              id: student.user_id,
              name: student.name,
              number: student.number,
              sex: student.sex
            } as User,
            clazz: {
              id: student.clazz_id,
              name: student.clazz_name
            }
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

  /**
   * 新增
   */
  save(student: {sno: any; sex: any; name: any; clazz_id: number}): Observable<{name: string; sex: number; sno: number; clazz_id: number}> {
    return this.httpClient.post<{name: string, sex: number, sno: number, clazz_id: number}>('/student/add', student);
  }

  /**
   * 根据ID获取学生
   */
  getById(id: number): Observable<{name: string, sex: number, klass_id: number, sno: number}> {
    return this.httpClient.get<{name: string, sex: number, klass_id: number, sno: number}>('student/getById/id/' + id.toString());
  }

  /**
   * 更新学生
   */
  update(id: number, student: {name: string, sex: number, sno: number, clazz_id: number}): Observable<Student> {
    return this.httpClient.put<Student>('/student/update/id/' + id.toString(), student);
  }

  /**
   * 更新密码
   */
  updatePasswordByAdmin(id: number, password: string): Observable<any> {
    console.log('service');
    return this.httpClient.post<any>('/student/updatePasswordByAdmin/id/' + id.toString(), password);
  }

  /**
   * 删除
   */
  delete(id: number): Observable<Student> {
    return this.httpClient
      .delete<Student>(`/student/delete/id/${id}`);
  }

}

interface T {
  id: number;
  user_id: number;
  number: string;
  sex: number;
  name: string;
  sno: number;
  clazz_id: number;
  clazz_name: string;
  state: number;
}
