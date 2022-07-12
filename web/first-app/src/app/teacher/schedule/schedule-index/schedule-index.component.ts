import { Component, OnInit } from '@angular/core';
import {Page} from '../../../entity/page';
import {Schedule} from '../../../entity/schedule';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ScheduleService} from '../../../service/schedule.service';
import {Confirm, Notify} from 'notiflix';
import {ScheduleKlass} from '../../../entity/schedule_klass';
import {Clazz} from '../../../entity/clazz';

@Component({
  selector: 'app-schedule-index',
  templateUrl: './schedule-index.component.html',
  styleUrls: ['./schedule-index.component.css']
})
export class ScheduleIndexComponent implements OnInit {

  page = 0;
  size = 3;

  pageData = new Page<{schedule: Schedule, clazzes: Clazz[]}>({
    content: [],
    number: this.page,
    size: this.size,
    numberOfElements: 0
  });

  constructor(
    private scheduleService: ScheduleService) { }

  ngOnInit(): void {
    this.loadByPage();
  }

  loadByPage(page: number = 0): void {
    console.log('loadByPage', page);
    this.scheduleService.page(page, this.size)
      .subscribe(pageData => {
        this.page = page;
        console.log('排课请求数据', pageData);
        this.pageData = pageData;
      });
  }

  onPage($event: number): void {
    this.loadByPage($event);
  }

  onDelete(id: number): void {
    Confirm.show(
      '请确认',
      '该操作不可逆',
      '确认',
      '取消',
      () => {
        this.scheduleService.delete(id)
          .subscribe(success => {
            console.log('删除成功', success);
            this.ngOnInit();
            Notify.success('删除成功', {timeout: 800});
          }, error => {
            console.log('删除失败', error);
            Notify.failure('删除失败', {timeout: 800});
          });
      },
    );
  }
}
