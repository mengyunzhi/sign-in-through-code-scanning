import {Observable} from 'rxjs';
import {Student} from '../entity/student';
import {Page} from '../entity/page';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private httpClient: HttpClient) {
  }


  page(page: number, size: number): Observable<Page<Student>> {
    const httpParams = new HttpParams()
      .append('page', page.toString())
      .append('size', size.toString());
    return this.httpClient.get<{length: number, content: Student[]}>('/student/page', {params: httpParams})
      .pipe(map(data =>
        new Page<Student>({
            content: data.content,
            number: page,
            size,
            numberOfElements: data.length
          }
        )));
  }

  /**
   * 新增
   */
  save(student: Student): Observable<Student> {
    return this.httpClient.post<Student>('/student/add', student);
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
  update(id: number, student: Student): Observable<Student>{
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
  delete(id: number): Observable<Student>{
    return this.httpClient
      .delete<Student>(`/student/delete/${id}`);
  }
}
