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


  page({page = 0, size = 20}: { page?: number, size?: number }): Observable<Page<Student>> {
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
  getById(id: number): Observable<Student> {
    return this.httpClient.get<Student>(`/student/${id}`);
  }

  /**
   * 更新学生
   */
  update(id: number, student: Student): Observable<Student>{
    return this.httpClient.put<Student>(`/student/${id}`, student);
  }

  /**
   * 删除
   */
  delete(id: number): Observable<Student>{
    return this.httpClient
      .delete<Student>(`/student/delete/${id}`);
  }
}
