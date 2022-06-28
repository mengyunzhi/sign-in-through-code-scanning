import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Clazz} from '../entity/clazz';

@Injectable({
  providedIn: 'root'
})
export class ClazzService {
  private baseUrl = 'clazz';

  constructor(protected httpClient: HttpClient) {
  }
  /**
   * 获取所有的班级
   */
  getAll(): Observable<Clazz[]> {
    return this.httpClient.get<Array<Clazz>>(this.baseUrl);
  }
}
