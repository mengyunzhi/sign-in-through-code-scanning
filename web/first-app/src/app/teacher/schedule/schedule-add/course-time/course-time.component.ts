import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Room} from '../../../../entity/room';

@Component({
  selector: 'app-course-time',
  templateUrl: './course-time.component.html',
  styleUrls: ['./course-time.component.css']
})
export class CourseTimeComponent implements OnInit {

  constructor() {
  }

  @Input()
  day: number | undefined;    // 当前单元对应day
  @Input()
  lesson: number | undefined; // 当前单元对应lesson
  @Input()
  weeks: number[] = [];       // 当前单元对应周
  @Input()
  rooms = [] as Room[];       // 当前单元对应rooms
  @Input()
  conflictData = [] as { week: number, clazzIds: number[], roomIds: number[] }[]; // 当前单元对应冲突数据
  @Input()
  selectedClazzes: number[] = [];   // 已选班级
  @Output() private outer = new EventEmitter();
  public msg = '我是子组件course-time的一个msg';

  // 已经选择的周
  selectedWeeks = [] as number[];
  // 已经选择的教室
  selectedRooms = [] as number[];

  courseTime = [];

  ngOnInit(): void {
    console.log('-------------------\n unit day', this.day);
    console.log('unit lesson', this.lesson);
    console.log('unit weeks', this.weeks);
    console.log('unit conflictData', this.conflictData);
    console.log('unit rooms', this.selectedClazzes);
    // 初始化courseTime
    this.initializationCourseTime();
  }

  initializationCourseTime(): void {
    for (let i = 0; i < 7; i++) {
      this.courseTime[i] = [];
      for (let j = 0; j < 5; j++) {
        this.courseTime[i][j] = [];
      }
    }
  }

  addSelectWeeks(week: number): void {
    let sta = true;
    for (const item of this.selectedWeeks) {
      if (item === week) {
        this.selectedWeeks.splice(this.selectedWeeks.indexOf(week), 1);
        sta = !sta;
      }
    }
    if (sta) {
      this.selectedWeeks.push(week);
    }
  }

  addSelectRooms(roomId: number): void {
    let sta = true;
    for (const item of this.selectedRooms) {
      if (item === roomId) {
        this.selectedRooms.splice(this.selectedRooms.indexOf(roomId), 1);
        sta = !sta;
      }
    }
    if (sta) {
      this.selectedRooms.push(roomId);
    }
  }

  sendParent(day: number, lesson: number): void {
    // console.log('this.Day', this.day);
    // console.log('this.Lesson', this.lesson);
    // console.log('selectedWeeks', this.selectedWeeks);
    // console.log('selectedRooms', this.selectedRooms);
    this.outer.emit(this.courseTime);
  }

  getDayAndLesson(day: number, lesson: number): void {
    // console.log('day', day);
    // console.log('lesson', lesson);
    // this.day = day;
    // this.lesson = lesson;
    // console.log('this.day', this.day);
    // console.log('this.lesson', this.lesson);
  }

  toCourseTime(day: number, lesson: number): void {
    console.log(day);
    console.log(lesson);
    console.log('selectedWeeks', this.selectedWeeks);
    console.log('selectedRooms', this.selectedRooms);
    this.courseTime[day][lesson] = { weeks: this.selectedWeeks, roomIds: this.selectedRooms};
    console.log(this.courseTime);
  }
}
