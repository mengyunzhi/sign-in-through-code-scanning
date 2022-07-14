import { Component, OnInit } from '@angular/core';
import {ScheduleService} from '../../../service/schedule.service';
import {Course} from '../../../entity/course';
import {Clazz} from '../../../entity/clazz';
import {Room} from '../../../entity/room';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Term} from '../../../entity/term';
import {ClazzService} from '../../../service/clazz.service';


@Component({
  selector: 'app-schedule-add',
  templateUrl: './schedule-add.component.html',
  styleUrls: ['./schedule-add.component.css']
})
export class ScheduleAddComponent implements OnInit {
  formGroup = new FormGroup({
    course_id: new FormControl('', Validators.required),
    clazz_ids: new FormControl(null, Validators.required),
  });

  constructor(private scheduleService: ScheduleService,
              private clazzService: ClazzService) { }

  lessons = [1, 2, 3, 4, 5];
  days = ['一', '二', '三', '四', '五', '六', '日'];

  /* 可选课程 */
  courses =  []  as Course[];
  /* 待处理班级，需要筛选掉已经上过该门课的班级 */
  clazzesToBeScreened = [] as Clazz[];
  /* 可选班级，clazzes筛选过后的班级 */
  clazzes: Clazz[] = [];


  /* 当前学期，用于获取周数数组  */
  term = {} as Term;
  /* 当前学期周数数组,传递给子组件 */
  weeks: number[] = [];
  /* 所有教室（Room::all）， 传递给子组件 */
  rooms = [] as Room[];

  /* 调度表中当前学期所有调度数据，筛选后传递给子组件 */
  dispatches = [] as {
    week: number,
    day: number,
    lesson: number,
    schedule_id: number,
    teacher_id: number,
    roomIds: number[],
    clazzIds: number[]
  }[];

  /* 检测：如果当前没有选择课程，那么班级也不应该被选择 */
  detect(): void {
    if (this.formGroup.get('course_id')?.value === '') {
      // 没有选择课程， 将clazz_id设为null
      this.formGroup.get('clazz_id')?.setValue(null);
    } else {
      // 选择课程，请求已选择该课程的班级klassIds, 并在clazzes中筛选掉这些班级
      this.clazzService.clazzesHaveSelectCourse(this.formGroup.get('course_id')?.value)
        .subscribe(clazzIds => {
          console.log('clazzIds', clazzIds);
          this.clazzes = this.clazzesToBeScreened.filter(clazz => !clazzIds.includes(clazz.id));
        }, error => {
          console.log('error', error);
        });
    }
  }

  ngOnInit(): void {
    // 向后台请求数据
    this.scheduleService.getDataForScheduleAdd()
      .subscribe(data => {
        console.log('data:', data);
        this.courses = data.courses;
        this.clazzesToBeScreened = data.clazzes;
        this.term = data.term;
        this.rooms = data.rooms;
        this.dispatches = data.dispatches;
        // 调用方法，获取周数数组
        this.getWeeks();
      }, error =>  {
        console.log('失败', error);
      });
  }

  getConflictData(day: number, lesson: number): {week: number, clazzIds: number[], roomIds: number[]}[] {
    const conflictData = [] as {week: number, clazzIds: number[], roomIds: number[], teacher_id: number}[];
    for (const data of this.dispatches) {
      if (day === data.day && lesson === data.lesson) {
        conflictData.push({
          week: data.week,
          clazzIds: data.clazzIds,
          roomIds: data.roomIds,
          teacher_id: data.teacher_id
        });
      }
    }
    return conflictData;
  }

  /* 通过term获取周的数组，传给子组件 */
  getWeeks(): void {
      const term = this.term;
      const difValue = (+term.end_time - +term.start_time) / (60 * 60 * 24);
      console.log('周的个数：', difValue);
      for (let i = 0; i < Math.ceil(difValue / 7); i++) {
        this.weeks.push(i);
      }
      console.log('this.weeks：', this.weeks);
  }
}
