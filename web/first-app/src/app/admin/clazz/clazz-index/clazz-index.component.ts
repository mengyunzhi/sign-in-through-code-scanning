import { Component, OnInit } from '@angular/core';
import {Clazz} from '../../../entity/clazz';
import {Page} from '../../../entity/page';
import {ClazzService} from '../../../service/clazz.service';
import {Confirm, Notify} from 'notiflix';

@Component({
  selector: 'app-clazz-student-index',
  templateUrl: './clazz-index.component.html',
  styleUrls: ['./clazz-index.component.css']
})
export class ClazzIndexComponent implements OnInit {
  page = 0;
  size = 10;

  pageData = new Page<Clazz>({
    content: [],
    number: this.page,
    size: this.size,
    numberOfElements: 0,
  });

  constructor(private clazzService: ClazzService) { }

  ngOnInit(): void {
    this.loadByPage();
  }

  loadByPage(page: number = 0): void {
    console.log('loadByPage', page);
    this.clazzService.page(page, this.size)
      .subscribe(pagedate => {
        console.log('班级数据请求成功', pagedate);
        this.page = page;
        this.pageData = pagedate;
      }, error => {
        console.log('班级数据请求失败', error);
      });
  }

  onDelete(clazz_id: number): void {
    Confirm.show(
      '请确认',
      '该操作不可逆',
      '确认',
      '取消',
      () => {
        this.clazzService.delete(clazz_id)
          .subscribe(success => {
            console.log('班级删除成功', success);
            this.ngOnInit();
            Notify.success('删除成功', {timeout: 800});
          }, error => {
            console.log('班级删除失败', error);
            Notify.failure('删除失败', {timeout: 800});
          });
      },
    );

  }

  onPage($event: number): void {
    console.log('onPage is called', $event);
    this.loadByPage($event);
  }
}
