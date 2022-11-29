import {Component, OnInit} from '@angular/core';
import {ScheduleService} from '../../../../service/schedule.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ClazzService} from '../../../../service/clazz.service';
import {Clazz} from '../../../../entity/clazz';
import {Dispatch} from '../../../../entity/dispatch';
import {DispatchService} from '../../../../service/dispatch.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Notify, Report} from 'notiflix';
import {CommonService} from '../../../../service/common.service';

@Component({
  selector: 'app-clazz-add',
  templateUrl: './clazz-add.component.html',
  styleUrls: ['./clazz-add.component.css']
})
/**
 * 筛选掉三类班级
 * 1，该排课对应的班级
 * 2，已经上过该课程的班级
 * 3，跟当前排课时间冲突的班级
 */
export class ClazzAddComponent implements OnInit {

  formGroup = new FormGroup({
    clazzId : new FormControl(null, Validators.required),
  });
  courseId: number | undefined;

  constructor(private scheduleService: ScheduleService,
              private route: ActivatedRoute,
              private clazzService: ClazzService,
              private dispatchService: DispatchService,
              private router: Router,
              private commonService: CommonService) { }
  courseName = '';
  id: number | undefined;
  // 当前排课以及有的班级
  alreadyExitClazzes = [] as Clazz[];
  // 当前排课对应的时间
  alreadyExitDispatches = [] as Dispatch[];
  // 第一次筛选完之后可以使用的班级，筛选该排课对应的班级
  firstFilerClazzes = [] as Clazz[];
  // 第二次筛选完之后可以使用的班级，筛选掉已经选择课程的班级
  secondFilerClazzes = [] as Clazz[];
  // 第三次筛选完之后可以使用的班级，筛选掉跟当前排课时间有冲突的班级
  thirdFilerClazzes = [] as Clazz[];
  // 通过冲突的scheduleId获取到对应的班级，用于第三次筛选
  dispatchConflictClazzes = [] as Clazz[];
  // 从所有的dispatches中挑选出与当前schedule时间冲突的scheduleId
  scheduleIdOfDispatchConflictClazzes = [] as number[];

  allClazzes = [] as Clazz[];
  allDispatches = [] as Dispatch[];

  ngOnInit(): void {
    this.id = +this.route.snapshot.params.schedule_id;
    this.scheduleService.editIndex(this.id)
      .subscribe(data => {
        this.courseId = data.schedule.course.id;
        this.courseName = data.schedule.course.name;
        this.alreadyExitClazzes = data.clazzes;
        this.alreadyExitDispatches = data.dispatches;
        console.log('scheduleEditIndex success', data);
        console.log('打印alreadyExitAlreadyExitDispatches', this.alreadyExitDispatches);
        this.getAllClazzes();
      }, error => {
        console.log('scheduleEditIndex error', error);
      });
  }

  /*
  *  获取数据库中所有调度信息
  * */
  getAllDispatches(): void {
    this.dispatchService.getAllDispatches().
    subscribe(allDispatches => {
      this.allDispatches = allDispatches;
      console.log('get all allDispatches success', this.allDispatches);
      this.getThirdFilerClazzes();
    }, error => {
      console.log('get all allDispatches error', error);
    });
  }

  /*
  *  获取数据库中所有班级
  * */
  getAllClazzes(): void {
    this.clazzService.getAll()
      .subscribe(allClazzes => {
        this.allClazzes = allClazzes;
        console.log('get all classes success', this.allClazzes);
        console.log('打印alreadyExitAlreadyExitClazzes', this.alreadyExitClazzes);
        this.getFirstFilerClazzes();
        this.getSecondFilerClazzes();
        this.getAllDispatches();
      }, error => {
        console.log('get all classes error', error);
      });
  }

  /*
  *  从allClazzes中除去alreadyExitClazzes的班级得到firstFilerClazzes
  * */
  getFirstFilerClazzes(): void {
    this.firstFilerClazzes = this.allClazzes
      .filter((x) => !this.alreadyExitClazzes.some((item) => x.id === item.id));
    console.log('打印firstFilerClazzes', this.firstFilerClazzes);
  }

  getSecondFilerClazzes(): void {
    this.clazzService.getClazzesByCourseId(this.courseId as  number)
        .subscribe(clazzes => {
          this.secondFilerClazzes = this.firstFilerClazzes.filter((x) => !clazzes.some(item => x.id === item.id));
        });
  }

  /*
  *  从firstFilerClazzes中除去与editIndex所有时间冲突的所有班级得到thirdFilerClazzes
  * */
  getThirdFilerClazzes(): void {
    console.warn(this.allDispatches, this.alreadyExitDispatches);
    for (const item of this.allDispatches) {
      for (const dispatch of this.alreadyExitDispatches) {
        if ( item.day === dispatch.day
          && item.lesson === dispatch.lesson
          && item.week === dispatch.week
          && item.schedule.id !== dispatch.schedule.id) {
          this.scheduleIdOfDispatchConflictClazzes.push(item.schedule.id);
        }
      }
    }
    console.warn(this.scheduleIdOfDispatchConflictClazzes);
    this.getDispatchConflictClazzesByScheduleId();
  }

  getDispatchConflictClazzesByScheduleId(): void {
    this.clazzService.getClazzesByScheduleId(this.scheduleIdOfDispatchConflictClazzes)
      .subscribe(dispatchConflictClazzes => {
        this.dispatchConflictClazzes = dispatchConflictClazzes;
        console.log('打印 dispatchConflictClazzes', this.dispatchConflictClazzes);
        // 从第一次筛选过后的班级中筛选出来不在冲突班级的班级
        this.thirdFilerClazzes = this.secondFilerClazzes
          .filter((x) => !this.dispatchConflictClazzes.some((item) => x.id === item.id));
        console.log('打印最终的可选择的班级', this.thirdFilerClazzes);
      });
  }

  onSubmit(): void {
    this.id = +this.route.snapshot.params.schedule_id;
    this.scheduleService.relateClazzToSchedule(this.id, this.formGroup.get('clazzId')?.value)
      .subscribe(() => {
        console.log('添加成功');
        this.commonService.success(() => this.router.navigate(['../'], {relativeTo: this.route}));
      }, error => {
        console.log('添加失败', error);
        this.commonService.error();
      });
  }
}
