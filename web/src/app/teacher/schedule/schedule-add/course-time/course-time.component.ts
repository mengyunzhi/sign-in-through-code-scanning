import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Room} from '../../../../entity/room';
import {Teacher} from '../../../../entity/teacher';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-course-time',
  templateUrl: './course-time.component.html',
  styleUrls: ['./course-time.component.css']
})
export class CourseTimeComponent implements OnInit {
  status = 1;

  constructor() {
  }

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
      this.clearData();
      this.selectedClazzes = selectedClazzes;
      this.loadData();
  }

  @Input()
  set style(param: undefined) {
    this.selectedWeeks = [];
    this.selectedRooms = [];
    this.setStatus();
  }

  @Output()
  private outer = new EventEmitter<{day: number, lesson: number, weeks: number[], roomIds: number[]}>();
  public msg = '我是子组件course-time的一个msg';

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
  days = ['一', '二', '三', '四', '五', '六', '日'];
  weeksForLoop = [] as {value: number, isChecked: boolean}[];
  roomsForLoop = [] as {id: number, name: string, isChecked: boolean}[];

  courseTime = [] as {weeks: number[], roomIds: number[]}[][];

  ngOnInit(): void {
    // clazzes变化的时候已经加载数据，需要先清除一下重新加载
    this.clearData();
    this.loadData();
    console.log(this.day, this.lesson, this.conflictData, this.disableWeeks, this.conflictWeeks);
    // console.log('-------------------\n unit day', this.day);
    // console.log('unit lesson', this.lesson);
    // console.log('unit weeks', this.weeks);
    // console.log('unit conflictData', this.conflictData);
    // console.log('unit rooms', this.selectedClazzes);
  }
  clearData(): void {
    this.selectedWeeks = [];
    this.selectedRooms = [];
    this.conflictWeeks = [];
    this.conflictRooms = [];
    this.disableWeeks = [];
    this.roomsForLoop = [];
    this.weeksForLoop = [];
  }

  onWeekChange(week: number): void {
    console.log('onWeekChange', this.conflictData);
    const index = this.selectedWeeks.indexOf(week);
    console.log(index);
    if (index === -1) {
      // 将week加入selectedWeeks
      this.selectedWeeks.push(week);
      // 通过week加入冲突的的roomIds
      const dataEqualWeek = this.conflictData.filter(data => data.week === week);
      if (dataEqualWeek.length > 0) {
        for (const data of dataEqualWeek) {
          for (const roomId of data.roomIds) {
            this.conflictRooms.push(roomId);
          }
        }
      }
    } else {
      // 去除当前week
      this.selectedWeeks.splice(index, 1);
      // 去除当前week对应的不可用roomIds
      const dataEqualWeek = this.conflictData.filter(data => data.week === week);
      if (dataEqualWeek.length > 0) {
        for (const data of dataEqualWeek) {
          for (const roomId of data.roomIds) {
            this.conflictRooms.splice(this.conflictRooms.indexOf(roomId), 1);
          }
        }
      }
    }
    this.setStatus();
  }

  onRoomChange(room_id: number): void {
    console.log('onRoomChange', this.conflictData);
    // 如果是-1代表数组中不含此room_id
    const index = this.selectedRooms.indexOf(room_id);
    console.log('onRoomChange', index);
    if (index === -1) {
      // 将room_id加入selectedRooms
      this.selectedRooms.push(room_id);
      // 通过room_id加入冲突的week
      const dataEqualRoomId = this.conflictData.filter(data => data.roomIds.includes(room_id));
      dataEqualRoomId.filter(data => this.conflictWeeks.push(data.week));
    } else {
      // 去除当前room_id
      this.selectedRooms.splice(index, 1);
      // 通过room_id去除冲突的week
      console.log('conflictData', this.conflictData);
      const dataHasRoomId = this.conflictData.filter(data => data.roomIds.includes(room_id));
      console.log('dataHasRoomId', dataHasRoomId);
      for (const data of dataHasRoomId) {
        this.conflictWeeks.splice(this.conflictWeeks.indexOf(data.week), 1);
      }
    }
    this.setStatus();
  }

  isWeekDisabled(week: number): boolean {
    // console.log(week, this.disableWeeks);
    return this.disableWeeks.includes(week) || this.conflictWeeks.includes(week);
  }

  isRoomDisabled(room_id: number): boolean {
    return this.conflictRooms.includes(room_id);
  }

  // 筛选出disableWeeks
  loadData(): void {
    for (const data of this.conflictData) {
      // 这个老师在当前周已经有课，直接跳过
      if (data.teacher_id === this.teacher.id) {
        this.disableWeeks.push(data.week);
        continue;
      }
      // data中clazzIds和selectedClazzes有交集
      // 已选择的班级中在这个时间段有已经有课的
      if (data.clazzIds.filter(clazzId => this.selectedClazzes.includes(clazzId)).length > 0) {
        this.disableWeeks.push(data.week);
      }
    }
    this.shiftWeeks();
    this.shiftRooms();
  }

  shiftWeeks(): void {
    let status = false;
    this.weeks.forEach(week => {
      if (this.selectedWeeks.indexOf(week) !== -1) { status = !status; }
      this.weeksForLoop.push({value: week, isChecked: status});
    });
  }

  shiftRooms(): void {
    let status = false;
    this.rooms.forEach(room => {
      if (this.selectedRooms.indexOf(room.id) !== -1) { status = !status; }
      this.roomsForLoop.push({id: room.id, name: room.name, isChecked: status});
    });
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

  sendParent(): void {
    // console.log('this.Day', this.day);
    // console.log('this.Lesson', this.lesson);
    // console.log('selectedWeeks', this.selectedWeeks);
    // console.log('selectedRooms', this.selectedRooms);
    this.outer.emit({day: this.day, lesson: this.lesson, weeks: this.selectedWeeks, roomIds: this.selectedRooms});
  }

  setStatus(): void {
    if (this.selectedWeeks.length === 0 && this.selectedRooms.length === 0) {
      this.status = 1;
    } else if (this.selectedWeeks.length > 0 && this.selectedRooms.length > 0) {
      this.status = 0;
    } else {
      this.status = -1;
    }
  }

  getContent(): string {
    if (this.status === 1) {
      return '周' + (this.days[this.day]) + '第' + (this.lesson + 1) + '节';
    } else if (this.status === 0) {
      let content = '';
      const selectedWeeks = [] as number[];
      this.selectedWeeks.filter(week => selectedWeeks.push(week + 1));
      content += `周:${selectedWeeks}    `;
      content += this.getRoomNames();
      return content;
    } else {
      return '请选择完整数据';
    }
  }

  private getRoomNames(): string {
    let roomNames = '教室:';
    for (let i = this.rooms.length - 1; i >= 0; i--) {
      if (this.selectedRooms.includes(this.rooms[i].id)) {
        roomNames += this.rooms[i].name + ';';
      }
    }
    return roomNames;
  }

}
