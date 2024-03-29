import {Component, OnInit} from '@angular/core';
import {Page} from '../../../entity/page';
import {Schedule} from '../../../entity/schedule';
import {ScheduleService} from '../../../service/schedule.service';
import {Clazz} from '../../../entity/clazz';
import {CommonService} from '../../../service/common.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-schedule-index',
  templateUrl: './schedule-index.component.html',
  styleUrls: ['./schedule-index.component.css']
})
export class ScheduleIndexComponent implements OnInit {

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
              private commonService: CommonService) {
  }

  ngOnInit(): void {
    this.loadByPage();
  }

  loadByPage(page: number = 0): void {
    console.log('loadByPage', page);
    // @ts-ignore
    this.scheduleService.page(page, this.size, this.queryGroup.value as {course: string, term: string}, window.sessionStorage.getItem('userNumber'))
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
    this.commonService.confirm(confirm => {
        if (confirm) {
          this.scheduleService.delete(id)
            .subscribe(success => {
              console.log('删除成功', success);
              this.commonService.success();
              this.ngOnInit();
            }, error => {
              console.log('删除失败', error);
              this.commonService.success();
            });
        }
      },
    );
  }
}
