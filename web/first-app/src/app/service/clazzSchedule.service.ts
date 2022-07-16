import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Clazz} from '../entity/clazz';

@Injectable({
  providedIn: 'root'
})
export class ClazzScheduleService {

  constructor(private httpClient: HttpClient) { }

  getClazzesByScheduleId(scheduleIdOfDispatchConflictClazzes: any[]): Observable<Array<Clazz>> {
    return this.httpClient.post<Array<Clazz>>('/schedule/getClazzesByScheduleId', scheduleIdOfDispatchConflictClazzes);
  }
}
