import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Page} from '../entity/page';
import {Term} from '../entity/term';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TermService {

  constructor(private httpClient: HttpClient) { }

  /*
  * 防止报错，返回类型加上了void
  * 该方法暂时未用
  * */
  page({page = 0, size = 20}: { page?: number, size?: number }): Observable<Page<Term>> | void {
    let terms = [] as Term[];
    this.httpClient.get<Term[]>('http://localhost:8080/api/angular/api/public/api/index/index')
      .subscribe(data => {
          terms = data;
          console.log('api请求', terms);
          return of({
            content: terms,
            number: page,
            size,
            numberOfElements: terms.length
          } as Page<Term>);
        },
        error => {
          console.log('请求失败', error);
        });
  }
}
