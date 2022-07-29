import { Component, OnInit } from '@angular/core';
import {Page} from '../../../entity/page';
import {Schedule} from '../../../entity/schedule';
import {ScheduleService} from '../../../service/schedule.service';
import {Clazz} from '../../../entity/clazz';
import {FormControl, FormGroup} from '@angular/forms';
import {TermService} from '../../../service/term.service';

@Component({
  selector: 'app-task-index',
  templateUrl: './task-index.component.html',
  styleUrls: ['./task-index.component.css']
})
export class TaskIndexComponent implements OnInit {

  page = 0;
  size = 2;

  queryGroup = new FormGroup({
    course: new FormControl(''),
    term: new FormControl('')
  });

  pageData = new Page<{schedule: Schedule, clazzes: Clazz[]}>({
    content: [],
    number: this.page,
    size: this.size,
    numberOfElements: 0
  });

  constructor(private scheduleService: ScheduleService,
              private termService: TermService) { }

  ngOnInit(): void {
    this.termService.getCurrentTerm()
      .subscribe(term => {
        this.queryGroup.get('term')?.setValue(term.name);
        this.loadByPage();
      });
  }

  loadByPage(page: number = 0): void {
    this.scheduleService.page(page, this.size, this.queryGroup.value)
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
