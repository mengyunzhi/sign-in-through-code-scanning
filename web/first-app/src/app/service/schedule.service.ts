import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Schedule} from '../entity/schedule';
import {Page} from '../entity/page';
import {map} from 'rxjs/operators';
import {UserService} from './user.service';
import {Course} from '../entity/course';
import {Clazz} from '../entity/clazz';
import {Term} from '../entity/term';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(
    private httpClient: HttpClient,
    private userService: UserService
  ) {
  }

  editIndex(id: number): Observable<any> {
    const httpParams = new HttpParams()
      .append('id', id.toString());
    return this.httpClient.get<any>('/schedule/editIndex', {params: httpParams});
  }

  page(page: number, size: number): Observable<Page<{schedule: Schedule, clazzes: Clazz[]}>> {
    const httpParams = new HttpParams()
      .append('page', page.toString())
      .append('size', size.toString());
    return this.httpClient.get<{
      length: number,
      content: {
        schedules: {id: number}[],
        clazzes: {clazzes: Clazz[]}[],
        teachers: {id: number, name: string}[],
        terms: {id: number, name: string}[],
        courses: {id: number, name: string}[],
      }}>('/schedule/page', {params: httpParams})
      .pipe(map(data => {
          const content: {schedule: Schedule, clazzes: Clazz[]}[] = [];
          const arrayGroup = data.content;
          console.log('service schedule', data);
          for (let i = 0; i < arrayGroup.schedules.length; i++) {
            content.push({
              schedule: {
                id: arrayGroup.schedules[i].id,
                course: {
                  name: arrayGroup.courses[i].name
                } as Course,
                term: {
                  name: arrayGroup.terms[i].name
                } as Term,
                teacher: {
                  name: arrayGroup.teachers[i].name
                }
              } as Schedule,
              clazzes: arrayGroup.clazzes[i].clazzes as Clazz[]
            });
          }
          return new Page<{schedule: Schedule, clazzes: Clazz[]}>({
            content,
            number: page,
            size,
            numberOfElements: data.length
          });
        }));
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete<any>('/schedule/delete/id/' + id.toString());
  }
}
