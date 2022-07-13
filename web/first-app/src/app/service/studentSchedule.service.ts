import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentScheduleService {

  constructor(private httpClient: HttpClient) { }

  delete(student_id: number, schedule_id: number): Observable<boolean> {
    const httpParams = new HttpParams()
      .append('student_id', student_id.toString())
      .append('schedule_id', schedule_id.toString());
    return this.httpClient.delete<boolean>('/student_schedule/deleteByStudentId', {params: httpParams});
  }
}
