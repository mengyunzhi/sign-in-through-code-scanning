import { Component, OnInit } from '@angular/core';
import {ScheduleService} from '../../../service/schedule.service';
import {ActivatedRoute} from '@angular/router';
import {Schedule} from '../../../entity/schedule';
import {Clazz} from '../../../entity/clazz';
import {Dispatch} from '../../../entity/dispatch';
import {Room} from '../../../entity/room';
import {Program} from '../../../entity/program';
import {ProgramService} from '../../../service/program.service';
import {Confirm} from 'notiflix';
import {CommonService} from '../../../service/common.service';
import {ClazzService} from '../../../service/clazz.service';
import {DispatchService} from '../../../service/dispatch.service';
@Component({
  selector: 'app-schedule-edit',
  templateUrl: './schedule-edit.component.html',
  styleUrls: ['./schedule-edit.component.css']
})
export class ScheduleEditComponent implements OnInit {
  component: any;

  constructor(private scheduleService: ScheduleService,
              private route: ActivatedRoute,
              private programService: ProgramService,
              private commonService: CommonService,
              private clazzService: ClazzService,
              private dispatchService: DispatchService) { }
  id: number | undefined;
  data = {} as {
    schedule: Schedule,
    programs: Program[],
    clazzes: Clazz[],
    dispatches: Dispatch[],
    rooms: Room[][]
  };
  ngOnInit(): void {
    this.id = +this.route.snapshot.params.schedule_id;
    this.scheduleService.editIndex(this.id)
      .subscribe(data => {
        this.data = data;
        console.log('scheduleEditIndex success', data);
      }, error => {
        console.log('scheduleEditIndex error', error);
      });
  }
  onDeleteClazz(clazzId: number): void {
    const scheduleId = this.id;
    this.commonService.confirm((confirm) => {
        if (confirm) {
          this.clazzService.courseClazzDelete(clazzId, scheduleId)
            .subscribe(success => {
              console.log('班级删除成功', success);
              this.ngOnInit();
              this.commonService.success();
            }, error => {
              console.log('班级删除失败', error);
              this.commonService.error();
            });
        }
      },
    );
  }

  onDeleteDispatch(id: number): void {
    this.commonService.confirm(confirm => {
      if (confirm) {
        this.dispatchService.delete(id)
          .subscribe(success => {
            console.log('调度删除成功', success);
            this.ngOnInit();
            this.commonService.success();
          }, error => {
            console.log('调度删除失败', error);
            this.commonService.error();
          });
      }
      },
    );
  }

  onDeleteProgram(id: number): void {
    this.commonService.confirm(confirm => {
        if (confirm) {
          this.programService.delete(id)
            .subscribe(success => {
              console.log('项目删除成功', success);
              this.ngOnInit();
              this.commonService.success();
            }, error => {
              console.log('项目删除失败', error);
              this.commonService.error();
            });
        }
      },
    );
  }

}
