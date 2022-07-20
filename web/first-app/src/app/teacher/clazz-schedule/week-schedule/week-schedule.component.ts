import { Component, OnInit } from '@angular/core';
import {CourseScheduleService} from '../../../service/courseSchedule.service';
import {Course} from '../../../entity/course';
import {Room} from '../../../entity/room';
import {Clazz} from '../../../entity/clazz';
import {FormControl, Validators} from '@angular/forms';
import {TermService} from '../../../service/term.service';
import {Term} from '../../../entity/term';

@Component({
  selector: 'app-week-schedule',
  templateUrl: './week-schedule.component.html',
  styleUrls: ['./week-schedule.component.css']
})
export class WeekScheduleComponent implements OnInit {

  constructor(private courseScheduleService: CourseScheduleService,
              private termService: TermService) { }
  // 课程表所查看的周
  week = new FormControl(0, Validators.required);
  day = 0;
  lesson = 0;
  term: Term | undefined;
  weeks: number[] | undefined;
  lessons = [1, 2, 3, 4, 5];
  days = ['一', '二', '三', '四', '五', '六', '日'];

  // 从后台获取的全部周的dispatch
  dispatches = [] as {week: number, day: number, lesson: number, course: Course, rooms: Room[], clazzes: Clazz[]}[];
  // 通过getCourse方法设置当前dispatch，然后用在每个单元的相关信息填写，随着day和lesson的循环不断更新
  dispatch = {} as {course: Course, rooms: Room[], clazzes: Clazz[]};
  // 将某一周的所有dispatches,存在矩阵中，方便寻找
  dispatchesMatrix = [] as {course: Course, rooms: Room[], clazzes: Clazz[]}[][];
  // ngif中控制是否渲染（数据加载完成后进行渲染）
  flag = 0;

  ngOnInit(): void {
    this.courseScheduleService.getData()
      .subscribe(dispatches => {
        console.log('getDataForWeek 请求成功', dispatches);
        this.dispatches = dispatches;
        this.loadData();
        this.flag = 1;
        this.week.valueChanges.subscribe(() => this.loadData());
      }, error => {
        console.log('请求失败', error);
      });
    this.termService.getCurrentTerm().subscribe(term => {
      this.term = term;
      this.weeks = this.termService.getWeeksByTerm(this.term);
    });
  }

  initDispatchesMatix(): void {
    for (let day = 0; day < 7; day++) {
      this.dispatchesMatrix[day] = [];
      for (let lesson = 0; lesson < 5; lesson++) {
        this.dispatchesMatrix[day][lesson] = {} as {course: Course, rooms: Room[], clazzes: Clazz[]};
      }
    }
  }


  loadData(): void {
    const dispatchesInWeek = this.dispatches.filter(d => d.week === +this.week.value);
    this.initDispatchesMatix();
    for (const dispatch of dispatchesInWeek) {
      console.log(dispatch);
      this.dispatchesMatrix[dispatch.day][dispatch.lesson] = {
        course: dispatch.course,
        rooms: dispatch.rooms,
        clazzes: dispatch.clazzes
      };
    }
    console.log(this.dispatchesMatrix.length);
  }

  getCourseName(day: number, lesson: number): string | void {
    this.day = day;
    this.lesson = lesson;
    console.log('123123123', day, lesson, this.dispatchesMatrix);
    this.dispatch = this.dispatchesMatrix[day][lesson];
    const str = this.dispatch.course?.name;
    if (str) {
      return str + '：';
    }
  }

  getClazzesName(): string | void {
    let str = '';
    if (this.dispatch.clazzes?.length) {
      for (const clazz of this.dispatch.clazzes) {
        if (clazz) {
          // 班级不为空，加班级名称
          str += clazz.name + ' ';
        } else {
          // 如果没有对应班级为了保证 ‘课程‘ 显示，加一个空格
          str += ' ';
        }
      }
    }
    if (str) {
      return '课程：' + str;
    }
  }

  getRoomsName(): string | void {
    let str = '';
    if (this.dispatch.rooms?.length) {
      for (const room of this.dispatch.rooms) {
        str += room.name + ' ';
      }
    }
    if (str) {
      return '教室：' + str;
    }
  }

}
