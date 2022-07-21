import {Component, OnInit} from '@angular/core';
import {Page} from '../../../entity/page';
import {Teacher} from '../../../entity/teacher';
import {TeacherService} from '../../../service/teacher.service';
import {Confirm, Notify} from 'notiflix';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CommonService} from '../../../service/common.service';

@Component({
  selector: 'app-teacher-index',
  templateUrl: './teacher-index.component.html',
  styleUrls: ['./teacher-index.component.css']
})
export class TeacherIndexComponent implements OnInit {
  page = 0;
  size = 3;

  pageData = new Page<Teacher>({
    content: [] as Teacher[],
    number: this.page,
    size: this.size,
    numberOfElements: 0,
  });

  // 初始化查询条件
  param = {name: '', phone: ''};
  queryForm = new FormGroup({
    name: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
  });

  constructor(private teacherService: TeacherService,
              private commonService: CommonService) {
  }

  ngOnInit(): void {
    this.loadByPage(0, this.param);
  }

  loadByPage(page: number = 0, param: {name: string, phone: string}): void {
    console.log('loadByPage', page);
    this.teacherService.page({page, size: this.size}, param)
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
    this.commonService.confirm(confirm => {
      if (confirm) {
        this.teacherService.delete(id)
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

  onPage($event: number): void {
    const query = this.queryForm.value as {
      name: string,
      phone: string,
    };
    this.loadByPage($event, query);
  }

  onSubmit(): void {
    const query = this.queryForm.value as {
      name: string,
      phone: string,
    };
    this.loadByPage(0, query);
  }

}
