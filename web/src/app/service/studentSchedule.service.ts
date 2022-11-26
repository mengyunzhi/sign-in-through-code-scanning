import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Clazz} from '../entity/clazz';
import {Student} from '../entity/student';
import {map} from 'rxjs/operators';
import {User} from '../entity/user';
import {Page} from '../entity/page';
import {ClazzService} from './clazz.service';
import {StudentService} from './student.service';

@Injectable({
  providedIn: 'root'
})
export class StudentScheduleService {
  clazzes: Clazz[] = [];
  students: Student[] = [];

  constructor(private httpClient: HttpClient,
              private clazzService: ClazzService,
              private studentService: StudentService) { }

  delete(student_id: number, schedule_id: number): Observable<boolean> {
    const httpParams = new HttpParams()
      .append('studentId', student_id.toString())
      .append('scheduleId', schedule_id.toString());
    return this.httpClient.get<boolean>('/schedule/deleteByStudentId', {params: httpParams});
  }

  getForAddByScheduleId(schedule_id: number): Observable<{clazzes: Clazz[], students: Student[][], studentIds: number[]}> {
    return this.httpClient.get<any>('/schedule/getForAddByScheduleId/' + schedule_id.toString());
  }

  add(data: { studentId: any; scheduleId: number }): Observable<boolean> {
    const httpParams = new HttpParams()
      .append('studentId', data.studentId.toString())
      .append('scheduleId', data.scheduleId.toString());
    return this.httpClient.post<boolean>('/schedule/addStudentInCourse', httpParams);
  }
}
