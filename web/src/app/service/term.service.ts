import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Page} from '../entity/page';
import {Term} from '../entity/term';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Room} from '../entity/room';

@Injectable({
  providedIn: 'root'
})
export class TermService {

  constructor(private httpClient: HttpClient) {
  }

  terms = [] as Term[];

  /**
   * 获取学期
   * @param id 学生ID
   */
  getById(id: number): Observable<Term> {
    return this.httpClient
      .get<Term>(`/term/getById/` + id.toString());
  }

  /*
  * 管理端学期管理页面
  * */
  page({page = 0, size = 2}: {page?: number, size?: number}, param: {name?: string}): Observable<Page<Term>> {
    let terms = [] as Term[];
    return new Observable<Page<Term>>(
      subscriber => {
        const httpParams = new HttpParams()
          .append('size', size.toString())
          .append('page', page.toString())
          .append('searchName', param.name ? param.name : '');
        this.httpClient.get<any>('/term/page', {params: httpParams})
          .subscribe(data => {
            // console.log('/term/page', data);

            terms = data.content;
            subscriber.next(new Page<Term>({
              content: terms,
              number: page,
              size,
              numberOfElements: data.totalElements
            }));
          }, error => {
            console.log('请求失败', error);
          });
      });
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
    // console.log('webstorm => data', data);
    const term = {
      name: data.name,
      start_time: data.start_time,
      end_time: data.end_time,
      state: data.state
    } as Term;
    return this.httpClient.post<Term>('/term/add', term);
  }

  /*
  * 删除学期
  * */
  delete(id: number): Observable<Term> {
    return this.httpClient
      .delete<Term>('/term/delete/' + id.toString());
  }

  getCurrentTerm(): Observable<Term> {
    return this.httpClient.get<Term>('/term/getCurrentTerm');
  }

  getWeeksByTerm(term: Term): number[] {
    const difValue = (+term.end_time - +term.start_time) / (60 * 60 * 24);
    const weeks = [];
    for (let i = 0; i < Math.ceil(difValue / 7); i++) {
      weeks.push(i);
    }
    return weeks;
  }

  /*
  * 更新学期
  * */
  update(id: number, term: {name: string, start_time: string, end_time: string, state: number}): Observable<any> {
    return this.httpClient
      .post<any>('/term/update/' + id.toString(), term);
  }

}
