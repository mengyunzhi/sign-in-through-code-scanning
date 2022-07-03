import { Component, OnInit } from '@angular/core';
import {Page} from '../../../entity/page';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Teacher} from '../../../entity/teacher';
import {TeacherService} from '../../../service/teacher.service';
import {Confirm, Notify} from 'notiflix';

@Component({
  selector: 'app-teacher-index',
  templateUrl: './teacher-index.component.html',
  styleUrls: ['./teacher-index.component.css']
})
export class TeacherIndexComponent implements OnInit {
  page = 0;
  size = 10;

  pageData = new Page<Teacher>({
    content: [],
    number: this.page,
    size: this.size,
    numberOfElements: 0,
  });

  constructor(private teacherService: TeacherService) { }

  ngOnInit(): void {
    this.loadByPage();
  }

  loadByPage(page: number = 0): void {
    console.log('loadByPage', page);
    this.teacherService.page(page, this.size)
      .subscribe(pageData => {
        this.page = page;
        console.log('教师index请求成功', pageData);
        this.pageData = pageData;
      });
  }

  /*
  * 删除
  * @params id 教师对应的user_id
  * */
  onDelete(id: number): void {
    Confirm.show(
      '请确认',
      '该操作不可逆',
      '确认',
      '取消',
      () => {
        this.teacherService.delete(id)
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

  onPage($event: number): void {
    console.log('onPage is called', $event);
    this.loadByPage($event);
  }

}
