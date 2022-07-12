import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DispatchService {

  constructor(private httpClient: HttpClient) { }

  delete(id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>('/dispatch/delete/id/' + id.toString());
  }
}
