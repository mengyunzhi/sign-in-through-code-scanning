import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Room} from '../../../../../entity/room';
import {Teacher} from '../../../../../entity/teacher';

@Component({
  selector: 'app-course-time2',
  templateUrl: './course-time2.component.html',
  styleUrls: ['./course-time2.component.css']
})
export class CourseTime2Component implements OnInit {

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
  schedule_id: number | undefined; // 当前编辑排课对应的id

  @Input()
  conflictData = [] as {
    week: number,
    schedule_id: number,
    teacher_id: number,
    roomIds: number[],
    clazzIds: number[]
  }[]; // 当前单元对应冲突数据

  @Input()
  set clazzes(selectedClazzes: number[]) {
    this.clearData();
    this.selectedClazzes = selectedClazzes;
    this.loadData();
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
  // 默认周
  defaultWeeks = [] as number[];
  // 默认教室
  defaultRooms = [] as number[];

  courseTime = [] as {weeks: number[], roomIds: number[]}[][];

  ngOnInit(): void {
    this.loadData();
    this.sendParent();
    console.log('coursetime-conflictData', this.day, this.lesson, this.conflictData);
    // console.log(this.day, this.lesson, this.conflictData, this.disableWeeks, this.conflictWeeks);
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
  }

  onWeekChange(week: number): void {
    // console.log('onWeekChange', this.conflictData);
    const index = this.selectedWeeks.indexOf(week);
    // console.log(index);
    if (index === -1) {
      // 将week加入selectedWeeks
      this.selectedWeeks.push(week);
      // 当前周不属于default再添加conflictRooms
      if (!this.defaultWeeks.includes(week)) {
        // 通过week加入冲突的的roomIds
        const dataEqualWeek = this.conflictData.filter(data => data.week === week);
        if (dataEqualWeek.length > 0) {
          for (const data of dataEqualWeek) {
            for (const roomId of data.roomIds) {
              this.conflictRooms.push(roomId);
            }
          }
        }
      } else if (this.defaultWeeks.includes(week)) {
        const dataEqualWeek = this.conflictData.filter(data => data.week === week);
        if (dataEqualWeek.length > 0) {
          for (const data of dataEqualWeek) {
            console.warn('test', data, this.day, this.lesson, data.roomIds.filter(room => this.defaultRooms.includes(room)));
            if (data.schedule_id !== this.schedule_id) {
              for (const roomId of data.roomIds) {
                this.conflictRooms.push(roomId);
              }
            }
          }
        }
      }
    } else {
      // 去除当前week
      this.selectedWeeks.splice(index, 1);
      // 当前教室不属于default再移除conflictWeeks,因为没添加就不需要移除
      if (!this.defaultWeeks.includes(week)) {
        // 去除当前week对应的不可用roomIds
        const dataEqualWeek = this.conflictData.filter(data => data.week === week);
        if (dataEqualWeek.length > 0) {
          for (const data of dataEqualWeek) {
            for (const roomId of data.roomIds) {
              this.conflictRooms.splice(this.conflictRooms.indexOf(roomId), 1);
            }
          }
        }
      } else if (this.defaultWeeks.includes(week)) {
        const dataEqualWeek = this.conflictData.filter(data => data.week === week);
        if (dataEqualWeek.length > 0) {
          for (const data of dataEqualWeek) {
            if (data.schedule_id !== this.schedule_id) {
              for (const roomId of data.roomIds) {
                this.conflictRooms.splice(this.conflictRooms.indexOf(roomId), 1);
              }
            }
          }
        }
      }
    }
    this.setStatus();
  }

  onRoomChange(room_id: number): void {
    // console.log('onRoomChange', this.conflictData);
    // 如果是-1代表数组中不含此room_id
    const index = this.selectedRooms.indexOf(room_id);
    // console.log('onRoomChange', index);
    if (index === -1) {
      // 将room_id加入selectedRooms
      this.selectedRooms.push(room_id);
      // 当前教室不属于default再添加conflictWeeks
      // 如果room不是默认的就可以添加conclictweek
      // 如果已经选的room和默认的room没有交集，可以添加到conflictweek
      if (!this.defaultRooms.includes(room_id)) {
        // 通过room_id加入冲突的week
        const dataHasRoomId = this.conflictData.filter(data => data.roomIds.includes(room_id));
        for (const data of dataHasRoomId) {
          if (!this.defaultWeeks.includes(data.week)) {
            this.conflictWeeks.push(data.week);
          }
        }
      } else if (this.defaultRooms.includes(room_id)) {
        // 通过room_id加入冲突的week
        const dataHasRoomId = this.conflictData.filter(data => data.roomIds.includes(room_id));
        for (const data of dataHasRoomId) {
          if (data.schedule_id !== this.schedule_id) {
            this.conflictWeeks.push(data.week);
          }
        }
      }
    } else {
      // 去除当前room_id
      this.selectedRooms.splice(index, 1);
      // 通过room_id去除冲突的week
      // console.log('conflictData', this.conflictData);
      // 当前教室不属于default再移除conflictWeeks,因为没添加就不需要移除
      if (!this.defaultRooms.includes(room_id)) {
        const dataHasRoomId = this.conflictData.filter(data => data.roomIds.includes(room_id));
        // console.log('dataHasRoomId', dataHasRoomId);
        for (const data of dataHasRoomId) {
          this.conflictWeeks.splice(this.conflictWeeks.indexOf(data.week), 1);
        }
      } else if (this.defaultRooms.includes(room_id)) {
        const dataHasRoomId = this.conflictData.filter(data => data.roomIds.includes(room_id));
        for (const data of dataHasRoomId) {
          if (data.schedule_id !== this.schedule_id) {
            this.conflictWeeks.splice(this.conflictWeeks.indexOf(data.week), 1);
          }
        }
      }
    }
    this.setStatus();
  }

  isWeekDisabled(week: number): boolean {
    // console.log(week, this.disableWeeks);
    return this.disableWeeks.includes(week) || this.conflictWeeks.includes(week);
  }

  isWeekChecked(week: number): boolean {
    return this.selectedWeeks.includes(week);
  }

  isRoomDisabled(room_id: number): boolean {
    return this.conflictRooms.includes(room_id);
  }

  isRoomChecked(room_id: number): boolean {
    return this.selectedRooms.includes(room_id);
  }


  // 筛选出disableWeeks
  loadData(): void {
    if (this.day === 0 && this.lesson === 0) {
    }
    if (this.conflictData.length > 0) {
      console.log('unit conflictData', this.day, this.lesson, this.conflictData);
    }
    for (const data of this.conflictData) {
      if (data.schedule_id === this.schedule_id) {
        // console.warn('data', data);
        // 如果schedule_id对应，将week和room_id列为default,并调用相关方法
        if (!this.defaultWeeks.includes(data.week)) {
          this.defaultWeeks.push(data.week);
          this.onWeekChange(data.week);
        }
        for (const roomId of data.roomIds) {
          if (!this.defaultRooms.includes(roomId)) {
            this.defaultRooms.push(roomId);
            this.onRoomChange(roomId);
          }
        }
      } else {
        // 如果不对应，根据教师和班级的冲突条件添加disableWeek
        if (data.teacher_id === this.teacher.id) {
          this.disableWeeks.push(data.week);
          continue;
        }
        // data中clazzIds和selectedClazzes有交集
        if (data.clazzIds.filter(clazzId => this.selectedClazzes?.includes(clazzId))?.length > 0) {
          this.disableWeeks.push(data.week);
        }
      }
    }
  }


  sendParent(): void {
    console.log('unit sendParent conflic', this.day, this.lesson, this.conflictData, this.defaultWeeks, this.defaultRooms);
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
      return '周' + (this.day + 1) + '第' + (this.lesson + 1) + '节';
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

