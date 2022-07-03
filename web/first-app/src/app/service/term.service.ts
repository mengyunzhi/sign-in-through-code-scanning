import { Injectable } from '@angular/core';
import {observable, Observable, of} from 'rxjs';
import {Page} from '../entity/page';
import {Term} from '../entity/term';
import {HttpClient, HttpParams} from '@angular/common/http';

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
    let terms = [] as Term[];
    return new Observable<Page<Term>>(
      subscriber => {
        const httpParams = new HttpParams()
          .append('size', size.toString())
          .append('page', page.toString());
        this.httpClient.get<any>('/term/page', {params: httpParams})
          .subscribe(data => {
            // 返回的内容是当前页面的学期数组和总共的学期数量 {} as {length: number, content: Term[]}
            terms = data.content;
            subscriber.next(new Page<Term>({
              content: terms,
              number: page,
              size,
              numberOfElements: data.length
            }));
          },
          error => {
            console.log('请求失败', error);
          });
      }
    );
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
