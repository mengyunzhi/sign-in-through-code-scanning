import { Component, OnInit } from '@angular/core';
import {ScheduleService} from '../../../service/schedule.service';
import {ActivatedRoute} from '@angular/router';
import {Schedule} from '../../../entity/schedule';
import {Clazz} from '../../../entity/clazz';
import {Dispatch} from '../../../entity/dispatch';
import {Room} from '../../../entity/room';
import {Program} from '../../../entity/program';

@Component({
  selector: 'app-schedule-edit',
  templateUrl: './schedule-edit.component.html',
  styleUrls: ['./schedule-edit.component.css']
})
export class ScheduleEditComponent implements OnInit {
  component: any;

  constructor(private scheduleService: ScheduleService,
              private route: ActivatedRoute) { }
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

}
