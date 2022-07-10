import { Component, OnInit } from '@angular/core';
import {ScheduleService} from '../../../service/schedule.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-schedule-edit',
  templateUrl: './schedule-edit.component.html',
  styleUrls: ['./schedule-edit.component.css']
})
export class ScheduleEditComponent implements OnInit {

  constructor(private scheduleService: ScheduleService,
              private route: ActivatedRoute) { }
  id: number | undefined;
  data = {};
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
