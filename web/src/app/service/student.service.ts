import {Observable} from 'rxjs';
import {Student} from '../entity/student';
import {Page} from '../entity/page';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map, timeout} from 'rxjs/operators';
import {User} from '../entity/user';
import {ClazzService} from './clazz.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private httpClient: HttpClient,
              private clazzService: ClazzService) {
  }


  page({page = 0, size = 2}: {size?: number; page?: number},
       param: {clazz?: string, name?: string, sno?: string}): Observable<Page<Student>> {
    const httpParams = new HttpParams()
      .append('page', page.toString())
      .append('size', size.toString())
      .append('clazzName', param.clazz ? param.clazz : '')
      .append('studentName', param.name ? param.name : '')
      .append('sno', param.sno ? param.sno : '');
    return this.httpClient.get<{totalElements: number, content: Student[]}>('/student/page', {params: httpParams})
      .pipe(map(data => {
        console.log('student/page 后台数据：', data);
        const content = data.content;
        return new Page<Student>({
          content,
          number: page,
          size,
          numberOfElements: data.totalElements
        });
      }));
  }

  pageByScheduleId(page: number, size: number, schedule_id: number, query: {clazz: string, name: string, sno: string}):
    Observable<Page<Student>> {
    const httpParams = new HttpParams()
      .append('page', page.toString())
      .append('size', size.toString())
      .append('ScheduleId', schedule_id.toString())
      .append('clazz', query.clazz)
      .append('name', query.name)
      .append('sno', query.sno);
    return this.httpClient.get<any>('/student/pageByScheduleId', {params: httpParams})
      .pipe(map(data => {
        console.log('pageByScheduleId', data);

        let students: Student[] = [];
        students = data;
        const resultContent = [] as Student[];
        for (const student of students) {
          resultContent.push({
            id: student.id,
            sno: student.sno.toString(),
            user: {
              id: student.user.id,
              name: student.user.name,
              number: student.number,
              sex: student.user.sex
            } as User,
            clazz: {
              id: student.clazz.id,
              name: student.clazz.name
            }
          } as Student);
        }

        const content = [] as Student[];

        for (let i = page * size; i < page * size + size; i++) {
          if (resultContent[i] !== undefined) {
            content.push(resultContent[i]);
          }
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
  save(student: Student): Observable<Student> {
    console.log('发送的数据：', student);
    return this.httpClient.post<Student>('/student/add', student);
  }

  /**
   * 根据ID获取学生
   */
  getById(id: number): Observable<Student> {
    return this.httpClient.get<Student>('student/getById/' + id.toString());
  }

  /**
   * 更新学生
   */
  update(id: number, student: Student): Observable<Student> {
    return this.httpClient.put<Student>('/student/update/' + id.toString(), student);
  }

  /**
   * 更新密码
   */
  updatePasswordByAdmin(id: number, password: string): Observable<any> {
    console.log('service');
    return this.httpClient.post<any>('/student/updatePasswordByAdmin/' + id.toString(), password);
  }

  /**
   * 删除
   */
  delete(id: number): Observable<Student> {
    return this.httpClient
      .delete<Student>(`/student/delete/${id}`);
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
