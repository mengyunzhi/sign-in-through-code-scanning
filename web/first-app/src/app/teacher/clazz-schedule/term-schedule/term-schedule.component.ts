import { Component, OnInit } from '@angular/core';
import {CourseScheduleService} from '../../../service/courseSchedule.service';
import {Course} from '../../../entity/course';
import {Room} from '../../../entity/room';
import {Clazz} from '../../../entity/clazz';
import {TermService} from '../../../service/term.service';
import {Term} from '../../../entity/term';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-term-schedule',
  templateUrl: './term-schedule.component.html',
  styleUrls: ['./term-schedule.component.css']
})
export class TermScheduleComponent implements OnInit {

  lessons = [1, 2, 3, 4, 5];
  days = ['一', '二', '三', '四', '五', '六', '日'];
  term: Term | undefined;
  // 从后台获取的全部周的dispatch
  dispatches = [] as {week: number, day: number, lesson: number, course: Course, rooms: Room[], clazzes: Clazz[]}[];
  flag = 0;

  weeks = new FormControl([], Validators.required);

  // 将某一周的所有dispatches,存在矩阵中，方便寻找
  dispatchesMatrix = [] as {
      course: Course,
      rooms: Room[],
      clazzes: Clazz[]
  }[][][][];
  // 每个小方框对应的所有周的课程信息
  dispatch = [] as {
      course: Course,
      rooms: Room[],
      clazzes: Clazz[]
  }[][];
  // 每个课程的信息
  unit = {} as {
    course: Course,
    rooms: Room[],
    clazzes: Clazz[]
  };
  constructor(private courseScheduleService: CourseScheduleService,
              private termService: TermService) { }

  ngOnInit(): void {
    this.courseScheduleService.getDataForWeek()
      .subscribe(dispatches => {
        console.log('getDataForWeek 请求成功', dispatches);
        this.dispatches = dispatches;
        this.loadData();
        this.termService.getCurrentTerm().subscribe(term => {
          this.term = term;
          this.weeks.setValue(this.termService.getWeeksByTerm(this.term));
          this.flag = 1;
        });
      }, error => {
        console.log('请求失败', error);
      });
  }

  loadData(): void {
    this.weeks.valueChanges.subscribe(() => {
      this.initDispatchesMatrix();
      for (const dispatch of this.dispatches) {
        console.log(dispatch);
        this.dispatchesMatrix[dispatch.day][dispatch.lesson][dispatch.week].push({
          course: dispatch.course,
          rooms: dispatch.rooms,
          clazzes: dispatch.clazzes
        });
      }
      console.log('dispatchesMatrix', this.dispatchesMatrix);
    });
  }

  initDispatchesMatrix(): void {
    for (let day = 0; day < 7; day++) {
      this.dispatchesMatrix[day] = [];
      for (let lesson = 0; lesson < 5; lesson++) {
        this.dispatchesMatrix[day][lesson] = [];
        for (let week = 0; week < this.weeks.value.length; week++) {
          this.dispatchesMatrix[day][lesson][week] = [] as {
              course: Course,
              rooms: Room[],
              clazzes: Clazz[]
          }[];
        }
      }
    }
  }

  loadDispatch(day: number, lesson: number): boolean {
    // console.log('load', this.dispatchesMatrix[day][lesson]);
    this.dispatch = this.dispatchesMatrix[day][lesson];
    // console.log(day, lesson, this.dispatch);
    return true;
  }

  getClazzes(): string {
    let str = '';
    for (const clazz of this.unit.clazzes) {
      if (clazz) {
        str += clazz?.name + ' ';
      }
    }
    return '班级：' + str;
  }

  getRooms(): string {
    let str = '';
    for (const room of this.unit.rooms) {
      if (room) {
        str += room?.name + ' ';
      }
    }
    return '教室：' + str;
  }

  getCourse(day: number, lesson: number, week: number, index: number): string {
    this.unit = this.dispatchesMatrix[day][lesson][week][index];
    return '课程：' + this.unit.course.name;
  }

}
