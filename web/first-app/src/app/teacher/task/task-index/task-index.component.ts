import { Component, OnInit } from '@angular/core';
import {Page} from '../../../entity/page';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Schedule} from '../../../entity/schedule';
import {ScheduleService} from '../../../service/schedule.service';
import {Teacher} from '../../../entity/teacher';
import {Program} from '../../../entity/program';
import {Clazz} from '../../../entity/clazz';
import {Dispatch} from '../../../entity/dispatch';
import {Room} from '../../../entity/room';

@Component({
  selector: 'app-task-index',
  templateUrl: './task-index.component.html',
  styleUrls: ['./task-index.component.css']
})
export class TaskIndexComponent implements OnInit {

  page = 0;
  size = 3;

  pageData = new Page<{schedule: Schedule, clazzes: Clazz[]}>({
    content: [],
    number: this.page,
    size: this.size,
    numberOfElements: 0
  });

  constructor(private scheduleService: ScheduleService) { }

  ngOnInit(): void {
    this.loadByPage();
  }

  loadByPage(page: number = 0): void {
    this.scheduleService.page(page, this.size)
      .subscribe(pagedata => {
        console.log('task', pagedata);
        this.page = page;
        this.pageData = pagedata;
      });
  }

  onPage($event: number): void {
    this.loadByPage($event);
  }

}
