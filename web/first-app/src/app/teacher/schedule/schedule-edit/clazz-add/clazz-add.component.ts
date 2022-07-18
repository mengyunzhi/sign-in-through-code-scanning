import {Component, OnInit} from '@angular/core';
import {ScheduleService} from '../../../../service/schedule.service';
import {ActivatedRoute} from '@angular/router';
import {ClazzService} from '../../../../service/clazz.service';
import {Clazz} from '../../../../entity/clazz';
import {Dispatch} from '../../../../entity/dispatch';
import {DispatchService} from '../../../../service/dispatch.service';
import {CourseScheduleService} from '../../../../service/courseSchedule.service';

@Component({
  selector: 'app-clazz-add',
  templateUrl: './clazz-add.component.html',
  styleUrls: ['./clazz-add.component.css']
})
export class ClazzAddComponent implements OnInit {

  constructor(private scheduleService: ScheduleService,
              private route: ActivatedRoute,
              private clazzService: ClazzService,
              private dispoatchService: DispatchService) { }
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
    this.dispoatchService.getAllDispatches().
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
              && item.week === dispatch.week) {
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
}
