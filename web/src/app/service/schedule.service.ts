import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Schedule} from '../entity/schedule';
import {Page} from '../entity/page';
import {map} from 'rxjs/operators';
import {UserService} from './user.service';
import {Course} from '../entity/course';
import {Clazz} from '../entity/clazz';
import {Term} from '../entity/term';
import {Teacher} from '../entity/teacher';
import {Room} from '../entity/room';
import {Dispatch} from '../entity/dispatch';
import {Program} from '../entity/program';
import {User} from '../entity/user';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(
    private httpClient: HttpClient,
    private userService: UserService
  ) {
  }

  editIndex(id: number): Observable<{
    schedule: Schedule,
    programs: Program[],
    clazzes: Clazz[],
    dispatches: Dispatch[],
    rooms: Room[][]
  }> {
    const httpParams = new HttpParams()
      .append('id', id.toString());
    return this.httpClient.get<{
      schedule: Schedule,
      clazzes: Clazz[],
      teacher: Teacher,
      user: User,
      course: Course,
      programs: Program[],
      dispatches: Dispatch[],
      rooms: Room[][]
    }>('/schedule/editIndex', {params: httpParams})
      .pipe(map(data => {
        console.log('editIndex Service:', data);
        return {
          schedule: {
            id: data.schedule.id,
            course: data.course,
            teacher: {
              id: data.teacher.id,
              user: data.user,
            } as Teacher,
          } as Schedule,
          programs: data.programs as Program[],
          clazzes: data.clazzes as Clazz[],
          dispatches: data.dispatches as Dispatch[],
          rooms: data.rooms as Room[][]
        };
      }));
  }

  getById(id: number): Observable<Schedule> {
    return this.httpClient.get<Schedule>('/schedule/getById/' + id.toString());
  }

  getDataForScheduleAdd(userName: string): Observable<{
    courses: Course[],
    clazzes: Clazz[],
    term: Term,
    teacher: Teacher,
    rooms: Room[],
    dispatches: {
      week: number,
      day: number,
      lesson: number,
      schedule_id: number,
      teacher_id: number,
      roomIds: number[],
      clazzIds: number[]
    }[]
  }> {
    const httpParams = new HttpParams()
      .append('userNumber', userName);
    return this.httpClient.get<{
      courses: Course[],
      clazzes: Clazz[],
      term: Term,
      teacher: Teacher,
      rooms: Room[],
      dispatches: {
        week: number,
        day: number,
        lesson: number,
        schedule_id: number,
        teacher_id: number,
        roomIds: number[],
        clazzIds: number[]
      }[]
    }>('/schedule/getDataForScheduleAdd', {params: httpParams});
  }

  getDataForScheduleEdit(schedule_id: number): Observable<{
    course: Course,
    clazzes: Clazz[],
    term: Term,
    teacher: Teacher,
    rooms: Room[],
    dispatches: {
      week: number,
      day: number,
      lesson: number,
      schedule_id: number,
      teacher_id: number,
      roomIds: number[],
      clazzIds: number[]
    }[]
  }> {
    return this.httpClient.get<any>('/schedule/getDataForScheduleEdit/schedule_id/' + schedule_id.toString());
  }

  // tslint:disable-next-line:max-line-length
  page(page: number, size: number, query: {course: string, term: string}, currentUserNumber: string): Observable<Page<{schedule: Schedule, clazzes: Clazz[]}>> {
    console.log('service');
    const httpParams = new HttpParams()
      .append('page', page.toString())
      .append('size', size.toString())
      .append('courseName', query.course)
      .append('userNumber', currentUserNumber)
      .append('termName', query.term);
    return this.httpClient.get<{
      totalElements: number,
      content: Schedule[]}>('/schedule/page', {params: httpParams})
      .pipe(map(data => {
          console.warn('page service', data);
          const content = [] as {schedule: Schedule, clazzes: Clazz[]}[];
          data.content.forEach((schedule: Schedule) => {
            content.push({schedule: schedule as Schedule, clazzes: schedule.clazzes});
          });
          return new Page<{schedule: Schedule, clazzes: Clazz[]}>({
            content,
            number: page,
            size,
            numberOfElements: data.totalElements
          });
        }));
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete<any>('/schedule/delete/id/' + id.toString());
  }

  scheduleSave(data: {
    teacherId: number,
    courseId: number,
    clazzIds: number[],
    courseTimes: {
      weeks: number[],
      roomIds: number[]
    }[][]
  }): Observable<string> {
    console.log('schedule service', data);
    return this.httpClient.post<string>('/schedule/scheduleSave', data);
  }

  scheduleUpdate(data: {
    courseId: number,
    scheduleId: number,
    courseTimes: {
      weeks: number[],
      roomIds: number[]
    }[][]
  }): Observable<boolean> {
    console.log('service data', data);
    return this.httpClient.post<boolean>('/schedule/scheduleUpdate', data);
  }

  courseKlassSave(id: number, clazz_id: { clazz_id: string }): Observable<boolean> {
    const data = [];
    data[0] = clazz_id;
    data[1] = id;
    console.log('service', data);
    return this.httpClient.post<boolean>('/schedule/courseKlassSave', data);
  }

}
