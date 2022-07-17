import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Room} from '../entity/room';
import {Clazz} from '../entity/clazz';
import {Course} from '../entity/course';
import {Dispatch} from '../entity/dispatch';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CourseScheduleService {

  constructor(private httpService: HttpClient) {
  }

  getDataForWeek(): Observable<{week: number, day: number, lesson: number, course: Course, rooms: Room[], clazzes: Clazz[]}[]> {
    return this.httpService.get<{
      clazzes: Clazz[][],
      courses: Course[],
      dispatches: {
        week: number,
        day: number,
        lesson: number,
        schedule_id: number
      }[][],
      rooms: Room[][][]
    }>('/course_schedule/getDataForWeek')
      .pipe(map(data => {
        console.log(data);
        const content = [] as {week: number, day: number, lesson: number, course: Course, rooms: Room[], clazzes: Clazz[]}[];
        // let j = 0;
        // let schedule_id = data.dispatches[0]?.schedule_id;
        for (let i = 0; i < data.dispatches.length; i++) {
          for (let j = 0; j < data.dispatches[i].length; j++) {
            content.push({
              week: data.dispatches[i][j].week,
              day: data.dispatches[i][j].day,
              lesson: data.dispatches[i][j].lesson,
              course: data.courses[i],
              rooms: data.rooms[i][j],
              clazzes: data.clazzes[i]
            });
          }
        }
        return content;
      }));
  }
}
