import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Clazz} from '../entity/clazz';
import {Student} from '../entity/student';

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

  getForAddByScheduleId(schedule_id: number): Observable<{clazzes: Clazz[], students: Student[][], studentIds: number[]}> {
    return this.httpClient.get<{clazzes: Clazz[], students: Student[][], studentIds: number[]}>('/student_schedule/getForAddByScheduleId/schedule_id/' + schedule_id.toString());
  }

  add(data: {student_id: number, schedule_id: number}): Observable<boolean> {
    return this.httpClient.post<boolean>('/student_schedule/add', data);
  }
}
