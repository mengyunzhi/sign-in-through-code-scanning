import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Schedule} from '../entity/schedule';
import {Page} from '../entity/page';
import {map} from 'rxjs/operators';
import {ScheduleKlass} from '../entity/schedule_klass';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  page(page: number, size: number): Observable<Page<ScheduleKlass>> {
    const httpParams = new HttpParams()
      .append('page', page.toString())
      .append('size', size.toString());
    return this.httpClient.get<{length: number, content: {
        schedule_id: number,
        clazz_name: string,
        course_name: string,
        term_name: string
      }[]}>('/schedule/page', {params: httpParams})
      .pipe(map(data => {
          const content: ScheduleKlass[] = [];
          for (const scheduleKlass  of data.content) {
            content.push({
              schedule: {
                id: scheduleKlass.schedule_id,
                course: {
                  name: scheduleKlass.course_name
                },
                term: {
                  name: scheduleKlass.term_name
                }
              },
              clazz: {
                name: scheduleKlass.clazz_name
              }
            } as ScheduleKlass);
          }
          return new Page<ScheduleKlass>({
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
