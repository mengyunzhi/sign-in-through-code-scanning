import {Component, OnInit} from '@angular/core';
import {ScheduleService} from '../../../service/schedule.service';
import {Course} from '../../../entity/course';
import {Clazz} from '../../../entity/clazz';
import {Room} from '../../../entity/room';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Term} from '../../../entity/term';
import {ClazzService} from '../../../service/clazz.service';
import {Teacher} from '../../../entity/teacher';
import {TeacherService} from '../../../service/teacher.service';
import {Notify, Report} from 'notiflix';
import {ActivatedRoute, Router} from '@angular/router';
import {TermService} from '../../../service/term.service';
import {CommonService} from '../../../service/common.service';


@Component({
  selector: 'app-schedule-add',
  templateUrl: './schedule-add.component.html',
  styleUrls: ['./schedule-add.component.css']
})
export class ScheduleAddComponent implements OnInit {

  constructor(private scheduleService: ScheduleService,
              private clazzService: ClazzService,
              private teacherService: TeacherService,
              private router: Router,
              private route: ActivatedRoute,
              private termService: TermService,
              private commonService: CommonService) { }
  formGroup = new FormGroup({
    course_id: new FormControl('', Validators.required),
    clazz_ids: new FormControl(null, Validators.required),
  });

  courseTimes = [] as {weeks: number[], roomIds: number[]}[][];

  lessons = [1, 2, 3, 4, 5];
  days = ['一', '二', '三', '四', '五', '六', '日'];

  /* 可选课程 */
  courses =  []  as Course[];
  /* 待处理班级，需要筛选掉已经上过该门课的班级 */
  clazzesToBeScreened = [] as Clazz[];
  /* 可选班级，clazzes筛选过后的班级 */
  clazzes: Clazz[] = [];


  /* 当前教师,传给子组件 */
  teacher = {} as Teacher;
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

  checkCourseTimes(): boolean {
    let count = 0;
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 5; j++) {
        console.log(this.courseTimes[i][j]);
        if ( (this.courseTimes[i][j].weeks.length === 0 && this.courseTimes[i][j].roomIds.length !== 0)
          || (this.courseTimes[i][j].weeks.length !== 0 && this.courseTimes[i][j].roomIds.length === 0)) {
          return false;
        } else if (this.courseTimes[i][j].weeks.length !== 0 && this.courseTimes[i][j].roomIds.length !== 0) {
          count++;
        }
      }
    }
    return count !== 0;
  }

  ngOnInit(): void {

    this.initCourseTimes();
    // 向后台请求数据
    this.scheduleService.getDataForScheduleAdd()
      .subscribe(data => {
        console.log('data:', data);
        this.courses = data.courses;
        this.clazzesToBeScreened = data.clazzes;
        this.term = data.term;
        this.rooms = data.rooms;
        this.dispatches = data.dispatches;
        this.teacher = data.teacher;
        this.weeks = this.termService.getWeeksByTerm(this.term);
      }, error =>  {
        console.log('失败', error);
      });
  }

  initCourseTimes(): void {
    for (let i = 0; i < 7; i++) {
      this.courseTimes[i] = [];
      for (let j = 0; j < 5; j++) {
        this.courseTimes[i][j] = {} as {weeks: number[], roomIds: number[]};
        this.courseTimes[i][j].weeks = [];
        this.courseTimes[i][j].roomIds = [];
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

  onClazzIdsChange(): void {
    // 班级有变动，courseTimes要清空， 防止之前的班级选择的某些数据影响之后的选择
    this.initCourseTimes();
  }

  onCourseIdChange(): void {
    // 课程有变动，courseTimes要清空， 防止之前的课程选择的某些数据影响之后的选择
    this.initCourseTimes();
    this.formGroup.get('clazz_ids')?.setValue([]);

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

  /* 接收子组件传回的数据 */
  getFooterRun(data: {day: number, lesson: number, weeks: number[], roomIds: number[]}): void {
    console.log('data', data);
    this.courseTimes[data.day][data.lesson] = {weeks: data.weeks, roomIds: data.roomIds};
    console.log('courseTimes', this.courseTimes);
  }

  onSubmit(): void {
    const status = this.checkCourseTimes();
    console.log(status);
    if (status) {
      console.log('onsubmit', {
        teacherId: this.teacher.id,
        courseId: this.formGroup.get('course_id')?.value,
        clazzIds: this.formGroup.get('clazz_ids')?.value,
        courseTimes: this.courseTimes
      });
      this.scheduleService.scheduleSave({
        teacherId: this.teacher.id,
        courseId: this.formGroup.get('course_id')?.value,
        clazzIds: this.formGroup.get('clazz_ids')?.value,
        courseTimes: this.courseTimes
      })
        .subscribe(success => {
            console.log('添加成功', success);
            this.commonService.success(() => this.router.navigate(['../'], {relativeTo: this.route}));
          },
          error => {
            console.log('添加失败', error);
            this.commonService.error();
          });
    } else {
      Report.failure('请完善上课时间信息', '', '确定');
    }
  }
}
