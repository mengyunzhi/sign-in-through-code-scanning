import {Component, Input, OnInit} from '@angular/core';
import {Room} from '../../../../entity/room';
import {Teacher} from '../../../../entity/teacher';

@Component({
  selector: 'app-course-time',
  templateUrl: './course-time.component.html',
  styleUrls: ['./course-time.component.css']
})
export class CourseTimeComponent implements OnInit {

  constructor() { }
  @Input()
  day = -1;    // 当前单元对应day

  @Input()
  lesson = -1; // 当前单元对应lesson

  @Input()
  weeks: number[] = [];       // 当前单元对应周

  @Input()
  teacher = {} as Teacher;       // 教师

  @Input()
  rooms = [] as Room[];       // 当前单元对应rooms

  @Input()
  conflictData = [] as {week: number, clazzIds: number[], roomIds: number[], teacher_id: number}[]; // 当前单元对应冲突数据

  @Input()
  set clazzes(selectedClazzes: number[]) {
    this.loadData();
    this.selectedClazzes = selectedClazzes;
  }

  selectedClazzes = [] as number[];
  // 已经选择的周
  selectedWeeks = [] as number[];
  // 已经选择的教室
  selectedRooms = [] as number[];
  // 无效周
  disableWeeks = [] as number[];
  // 不可用的周
  conflictWeeks = [] as number[];
  // 不可用的教室
  conflictRooms = [] as number[];



  ngOnInit(): void {
    this.loadData();
    console.log(this.day, this.lesson, this.conflictData, this.disableWeeks, this.conflictWeeks);
    // console.log('-------------------\n unit day', this.day);
    // console.log('unit lesson', this.lesson);
    // console.log('unit weeks', this.weeks);
    // console.log('unit conflictData', this.conflictData);
    // console.log('unit rooms', this.selectedClazzes);
  }

  onWeekChange(week: number): void {

  }

  onRoomChange(room_id: number): void {

  }

  isWeekDisabled(week: number): boolean {
    // console.log(week, this.disableWeeks);
    return this.disableWeeks.includes(week) || this.conflictWeeks.includes(week);
  }

  // 筛选出disableWeeks
  loadData(): void {
    for (const data of this.conflictData) {
      if (data.teacher_id === this.teacher.id) {
        this.disableWeeks.push(data.week);
        continue;
      }
      // data中clazzIds和selectedClazzes有交集
      if (data.clazzIds.filter(clazzId => this.selectedClazzes.includes(clazzId)).length > 0) {
        this.disableWeeks.push(data.week);
      }
    }
  }

}
