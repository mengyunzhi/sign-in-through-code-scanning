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
import {Assert} from '@yunzhi/ng-mock-api';
import {TermService} from '../../../../service/term.service';
import {CommonService} from '../../../../service/common.service';


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
              private route: ActivatedRoute,
              private termService: TermService,
              private commonService: CommonService) { }

  courseTimes = [] as {weeks: number[], roomIds: number[]}[][];

  lessons = [0, 1, 2, 3, 4];
  days = ['一', '二', '三', '四', '五', '六', '日'];

  /* 课程 */
  course =  {name: '正在加载...'} as Course;
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

  /*是否在请求中*/
  isRequesting = false;

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
        this.weeks = this.termService.getWeeksByTerm(this.term);
      }, error =>  {
        console.log('失败', error);
      });
  }

  checkCourseTimes(): boolean {
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 5; j++) {
        console.log(this.courseTimes[i][j]);
        if ( (this.courseTimes[i][j].weeks.length === 0 && this.courseTimes[i][j].roomIds.length !== 0)
          || (this.courseTimes[i][j].weeks.length !== 0 && this.courseTimes[i][j].roomIds.length === 0)) {
          return false;
        }
      }
    }
    return true;
  }

  initCourseTimes(): void {
    for (let i = 0; i < 7; i++) {
      this.courseTimes[i] = [];
      for (let j = 0; j < 7; j++) {
        this.courseTimes[i][j] = {} as {weeks: number[], roomIds: number[]};
      }
    }
  }

  getConflictData(day: number, lesson: number):
    {schedule_id: number, week: number, clazzIds: number[], roomIds: number[], teacher_id: number}[] {
    const conflictData = [] as {
        week: number,
        schedule_id: number,
        teacher_id: number,
        roomIds: number[],
        clazzIds: number[]
      }[];
    for (const data of this.dispatches) {
      if (data.day === day && data.lesson === lesson) {
        conflictData.push({
          week: data.week,
          schedule_id: data.schedule_id,
          teacher_id: data.teacher_id,
          roomIds: data.roomIds,
          clazzIds: data.clazzIds,
        });
      }
    }
    return conflictData;
  }

  /* 接收子组件传回的数据 */
  getFooterRun(data: {day: number, lesson: number, weeks: number[], roomIds: number[]}): void {
    console.log('data', data);
    this.courseTimes[data.day][data.lesson] = {weeks: data.weeks, roomIds: data.roomIds};
    console.log('courseTimes', this.courseTimes);
  }

  onSubmit(): void {
    const status = this.checkCourseTimes();
    console.log(status);
    if (status && !this.isRequesting) {
      this.isRequesting = true;
      Assert.isNumber(this.schedule_id, 'schedule_id的类型不是number');
      this.scheduleService.scheduleUpdate({
        courseId: this.course.id,
        scheduleId: this.schedule_id as number,
        courseTimes: this.courseTimes
      })
        .subscribe(success => {
            console.log('更新成功', success);
            console.log(typeof(success));
            if (!success) {
              console.log('不支持此类操作');
              this.commonService.error(() => this.router.navigate(['../'], {relativeTo: this.route}), '', '不支持此类操作');
            } else {
              this.commonService.success(() => this.router.navigate(['../'], {relativeTo: this.route}));
            }
          },
          error => {
            console.log('更新失败', error);
            this.commonService.error();
          }, () => {
            this.isRequesting = false;
          });
    } else {
      Report.failure('请完善上课时间信息', '', '确定');
    }
  }
}
