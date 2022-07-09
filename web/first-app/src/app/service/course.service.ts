import { Injectable } from '@angular/core';
import {observable, Observable, of} from 'rxjs';
import {Page} from '../entity/page';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Course} from '../entity/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private httpClient: HttpClient) {
  }

  /*
  * 教师端课程管理index页面
  */
  page({page = 0, size = 20}: { size?: number; page?: number }): Observable<Page<Course>> {
    let courses = [] as Course[];
    return new Observable<Page<Course>>(
      subscriber => {
        const httpParams = new HttpParams()
          .append('page', page.toString())
          .append('size', size.toString());
        this.httpClient.get<any>('course/page', {params: httpParams})
          .subscribe(data => {
            courses = data.content;
            subscriber.next(new Page<Course>({
              content: courses,
              number: page,
              size,
              numberOfElements: data.length
            }));
          }, error => {
            console.log('请求失败', error);
          });
      }
    );
  }

  /*
  *  新增课程
  * */
  add(data: { name: string; lesson: number }): Observable<Course> {
    const course = {
      name: data.name,
      lesson: data.lesson
    } as Course;
    return this.httpClient.post<Course>('/course/add', course);
  }

  getById(id: number): Observable<Course> {
    return this.httpClient
      .get<Course>(`/course/getById/id/` + id.toString());
  }
}
