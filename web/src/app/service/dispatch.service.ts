import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Dispatch} from '../entity/dispatch';

@Injectable({
  providedIn: 'root'
})
export class DispatchService {

  constructor(private httpClient: HttpClient) { }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>('/dispatch/delete/' + id.toString());
  }

  getAllDispatches(): Observable<Array<Dispatch>> {
    return this.httpClient.get<Array<Dispatch>>('/dispatch/getAll');
  }
}
