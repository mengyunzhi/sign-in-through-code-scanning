import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Program} from '../entity/program';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  constructor(private httpClient: HttpClient) { }

  add(data: {name: string, courseId: number, lesson: number}): Observable<boolean> {
    return this.httpClient.post<any>('/program/add', data);
  }

  delete(id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>('/program/delete/' + id.toString());
  }

  getById(id: number): Observable<Program> {
    return this.httpClient.get<Program>('/program/getById/' + id.toString());
  }

  update(id: number, data: {name: string, lesson: number}): Observable<boolean> {
    return this.httpClient.post<boolean>('/program/update/' + id.toString(), data);
  }

}
