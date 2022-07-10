import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  constructor(private httpClient: HttpClient) { }

  add(data: {name: string, course_id: number, lesson: number}): Observable<any> {
    return this.httpClient.post('/program/add', data);
  }

}
