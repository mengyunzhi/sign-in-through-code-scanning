import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Page} from '../entity/page';
import {Term} from '../entity/term';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TermService {

  constructor(private httpClient: HttpClient) { }

  terms = [] as Term[];
  /**
   * 获取学期
   * @param id 学生ID
   */
  getById(id: number): Observable<Term> {
    return this.httpClient
      .get<Term>(`/term/getById/id/` + id.toString());
  }

  /*
  * 管理端学期管理页面
  * */
  page({page = 0, size = 20}: { page?: number, size?: number }): Observable<Page<Term>> {
    const httpParams = new HttpParams()
      .append('size', size.toString())
      .append('page', page.toString());
    return this.httpClient.get<{length: number, content: Term[]}>('/term/page', {params: httpParams})
      .pipe(map(data =>
          new Page<Term>({
            content: data.content,
            number: page,
            size,
            numberOfElements: data.length
          }
      )));
  }


  /*
  * 激活学期
  * */
  activate(id: number): Observable<any> {
    return this.httpClient.post<any>('/term/activate', id);
  }

  /*
  * 新增学期
  * */
  add(data: {name: string, start_time: string, end_time: string, state: number}): Observable<Term> {
    const term = {
      name: data.name,
      start_time: data.start_time,
      end_time: data.end_time,
      state: data.state
    } as Term;
    return this.httpClient.post<Term>('/term/add', term);
  }

  delete(id: number): Observable<Term> {
    return this.httpClient
      .delete<Term>('/term/delete/id/' + id.toString());
  }

  /*
  * 更新学期
  * */
  update(id: number, term: {name: string, start_time: string, end_time: string, state: number}): Observable<any> {
    return this.httpClient
      .post<any>('/term/update/id/' + id.toString(), term);
  }
}
