import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Schedule} from '../entity/schedule';
import {Page} from '../entity/page';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  page(page: number, size: number): Observable<Page<Schedule>> {
    const httpParams = new HttpParams()
      .append('page', page.toString())
      .append('size', size.toString());
    return this.httpClient.get<any>('/schedule/page', {params: httpParams})
      .pipe(map(data =>
        new Page<Schedule>({
          content: data.content,
          number: page,
          size,
          numberOfElements: data.length
        })));
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete<any>('/schedule/delete/id/' + id.toString());
  }
}
