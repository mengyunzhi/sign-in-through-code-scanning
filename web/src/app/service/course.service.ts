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
  page({page = 0, size = 2}: { size?: number; page?: number }, course: { name?: string; lesson?: string} ): Observable<Page<Course>> {
    let courses = [] as Course[];

    if (course.lesson === null) {
      course.lesson = '';
    }

    console.log('444');
    console.log(course);
    console.log('555');
    return new Observable<Page<Course>>(
      subscriber => {
        const httpParams = new HttpParams()
          .append('searchName', course.name as string)
          .append('searchLesson', course.lesson as unknown as string)
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

  update(id: number, course: { name: any; lesson: any }): Observable<any> {
    console.log('更新课程');
    return this.httpClient.post('/course/update/id/' + id.toString(), course);
  }

  delete(id: number): Observable<Course> {
    console.log(id);
    return this.httpClient.delete<Course>('/course/delete/id/' + id.toString());
  }
}
