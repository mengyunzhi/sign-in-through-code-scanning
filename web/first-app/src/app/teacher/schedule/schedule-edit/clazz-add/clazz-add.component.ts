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
export class ClazzAddComponent implements OnInit {
  formGroup = new FormGroup({
    clazz_id : new FormControl(null, Validators.required),
  });

  constructor(private scheduleService: ScheduleService,
              private route: ActivatedRoute,
              private clazzService: ClazzService,
              private dispatchService: DispatchService,
              private router: Router,
              private commonService: CommonService) { }
  courseName = '';
  id: number | undefined;
  alreadyExitClazzes = [] as Clazz[];
  alreadyExitDispatches = [] as Dispatch[];
  firstFilerClazzes = [] as Clazz[];
  secondFilerClazzes = [] as Clazz[];
  dispatchConflictClazzes = [] as Clazz[];
  scheduleIdOfDispatchConflictClazzes = [];

  allClazzes = [] as Clazz[];
  allDispatches = [] as Dispatch[];

  ngOnInit(): void {
    this.id = +this.route.snapshot.params.schedule_id;
    this.scheduleService.editIndex(this.id)
      .subscribe(data => {
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
      this.getSecondFilerClazzes();
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

  /*
  *  从firstFilerClazzes中除去与editIndex所有时间冲突的所有班级得到secondFilerClazzes
  * */
  getSecondFilerClazzes(): void {
    for (const item of this.allDispatches) {
      for (const dispatch of this.alreadyExitDispatches) {
        if ( item.day === dispatch.day
          && item.lesson === dispatch.lesson
          && item.week === dispatch.week
          && item.schedule_id !== dispatch.schedule_id) {
          this.scheduleIdOfDispatchConflictClazzes.push(item.schedule_id);
          console.log('打印scheduleIdOfDispatchConflictClazzes', this.scheduleIdOfDispatchConflictClazzes);
        }
      }
    }
    this.getDispatchConflictClazzesByScheduleId();
  }

  getDispatchConflictClazzesByScheduleId(): void {
    this.clazzService.getClazzesByScheduleId(this.scheduleIdOfDispatchConflictClazzes)
      .subscribe(dispatchConflictClazzes => {
        this.dispatchConflictClazzes = dispatchConflictClazzes;
        console.log('打印 dispatchConflictClazzes', this.dispatchConflictClazzes);
        this.secondFilerClazzes = this.firstFilerClazzes
          .filter((x) => !this.dispatchConflictClazzes.some((item) => x.id === item.id));
        console.log('打印最终的可选择的班级', this.secondFilerClazzes);
      });
  }

  onSubmit(): void {
    this.id = +this.route.snapshot.params.schedule_id;
    const clazz_id = this.formGroup.value as {
      clazz_id: string,
    };
    this.scheduleService.courseKlassSave(this.id, this.formGroup.get('clazz_id')?.value)
      .subscribe(success => {
        console.log('添加成功', success);
        this.commonService.success(() => this.router.navigate(['../'], {relativeTo: this.route}));
      }, error => {
        console.log('添加失败', error);
        this.commonService.error();
      });
    console.log('edit class-add save', this.formGroup.get('clazz_id')?.value);
    console.log('currentScheduleId', this.id);
  }
}
