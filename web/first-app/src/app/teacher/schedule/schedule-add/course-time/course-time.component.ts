import {Component, Input, OnInit} from '@angular/core';
import {Room} from '../../../../entity/room';

@Component({
  selector: 'app-course-time',
  templateUrl: './course-time.component.html',
  styleUrls: ['./course-time.component.css']
})
export class CourseTimeComponent implements OnInit {

  constructor() { }
  @Input()
  day: number | undefined;    // 当前单元对应day
  @Input()
  lesson: number | undefined; // 当前单元对应lesson
  @Input()
  weeks: number[] = [];       // 当前单元对应周
  @Input()
  rooms = [] as Room[];       // 当前单元对应rooms
  @Input()
  conflictData = [] as {week: number, clazzIds: number[], roomIds: number[]}[]; // 当前单元对应冲突数据
  @Input()
  selectedClazzes: number[] = [];   // 已选班级

  // 已经选择的周
  selectedWeeks = [] as number[];
  // 已经选择的教室
  selectedRooms = [] as number[];



  ngOnInit(): void {
    console.log('-------------------\n unit day', this.day);
    console.log('unit lesson', this.lesson);
    console.log('unit weeks', this.weeks);
    console.log('unit conflictData', this.conflictData);
    console.log('unit rooms', this.selectedClazzes);
  }

}
