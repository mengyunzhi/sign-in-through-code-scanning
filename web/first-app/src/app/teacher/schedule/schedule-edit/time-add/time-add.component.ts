import {Component, OnInit} from '@angular/core';
import {ScheduleService} from '../../../../service/schedule.service';
import {Course} from '../../../../entity/course';
import {Clazz} from '../../../../entity/clazz';
import {Room} from '../../../../entity/room';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Term} from '../../../../entity/term';
import {ClazzService} from '../../../../service/clazz.service';
import {Teacher} from '../../../../entity/teacher';
import {TeacherService} from '../../../../service/teacher.service';
import {Notify, Report} from 'notiflix';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-time-add',
  templateUrl: './time-add.component.html',
  styleUrls: ['./time-add.component.css']
})
export class TimeAddComponent implements OnInit {

  formGroup = new FormGroup({
    course_id: new FormControl('', Validators.required),
    clazz_ids: new FormControl(null, Validators.required),
  });

  constructor(private scheduleService: ScheduleService,
              private clazzService: ClazzService,
              private teacherService: TeacherService,
              private router: Router,
              private route: ActivatedRoute) { }

  courseTimes = [] as {weeks: number[], roomIds: number[]}[][];

  lessons = [1, 2, 3, 4, 5];
  days = ['一', '二', '三', '四', '五', '六', '日'];

  /* 课程 */
  course =  {} as Course;
  /* 班级 */
  clazzes = [] as Clazz[];


  /* 当前教师,传给子组件 */
  teacher = {} as Teacher;
  /* 当前学期，用于获取周数数组  */
  term = {} as Term;
  /* 当前学期周数数组,传递给子组件 */
  weeks: number[] = [];
  /* 所有教室（Room::all）， 传递给子组件 */
  rooms = [] as Room[];

  /* 当前编辑的schedule_id */
  schedule_id: number | undefined;

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

  ngOnInit(): void {
    this.schedule_id = +this.route.snapshot.params.schedule_id;
    console.log('schedule_id', this.schedule_id);
    this.initCourseTimes();

    // 向后台请求数据
    this.scheduleService.getDataForScheduleEdit(this.schedule_id)
      .subscribe(data => {
        console.log('data:', data);
        this.course = data.course;
        this.clazzes = data.clazzes;
        this.term = data.term;
        this.rooms = data.rooms;
        this.dispatches = data.dispatches;
        this.teacher = data.teacher;
        // 调用方法，获取周数数组
        this.getWeeksByTerm();
      }, error =>  {
        console.log('失败', error);
      });
  }

  initCourseTimes(): void {
    for (let i = 0; i < 7; i++) {
      this.courseTimes[i] = [];
      for (let j = 0; j < 7; j++) {
        this.courseTimes[i][j] = {} as {weeks: number[], roomIds: number[]};
      }
    }
  }

  getConflictData(day: number, lesson: number): {week: number, clazzIds: number[], roomIds: number[], teacher_id: number}[] {
    const conflictData = [] as {week: number, clazzIds: number[], roomIds: number[], teacher_id: number}[];
    for (const data of this.dispatches) {
      if (data.day === day && data.lesson === lesson) {
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
  getWeeksByTerm(): void {
    const term = this.term;
    const difValue = (+term.end_time - +term.start_time) / (60 * 60 * 24);
    console.log('周的个数：', difValue);
    for (let i = 0; i < Math.ceil(difValue / 7); i++) {
      this.weeks.push(i);
    }
    console.log('this.weeks：', this.weeks);
  }

  /* 接收子组件传回的数据 */
  getFooterRun(data: {day: number, lesson: number, weeks: number[], roomIds: number[]}): void {
    console.log('data', data);
    this.courseTimes[data.day][data.lesson] = {weeks: data.weeks, roomIds: data.roomIds};
    console.log('courseTimes', this.courseTimes);
  }

  onSubmit(): void {
    const schedule = this.formGroup.value as {
      course_id: [],
      clazz_ids: []
    };
    this.scheduleService.scheduleSave({
      teacherId: this.teacher.id,
      courseId: this.formGroup.get('course_id')?.value,
      clazzIds: this.formGroup.get('clazz_ids')?.value,
      courseTimes: this.courseTimes
    })
      .subscribe(success => {
          console.log('添加成功', success);
          this.router.navigate(['../'], {relativeTo: this.route}).then();
          Notify.success('添加成功', {timeout: 1000});
        },
        error => {
          console.log('添加失败', error);
          Report.failure('添加失败', '', '确定');
        });
  }
}
