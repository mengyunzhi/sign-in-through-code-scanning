import {Component, OnInit} from '@angular/core';
import {ClazzService} from '../../../service/clazz.service';
import {ActivatedRoute} from '@angular/router';
import {Assert} from '@yunzhi/ng-mock-api';
import {Page} from '../../../entity/page';
import {Student} from '../../../entity/student';
import {StudentService} from '../../../service/student.service';
import {CommonService} from '../../../service/common.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-clazz-members',
  templateUrl: './clazz-members.component.html',
  styleUrls: ['./clazz-members.component.css']
})
export class ClazzMembersComponent implements OnInit {
  page = 0;
  size = 5;

  pageData = new Page<Student>({
    content: [] as Student[],
    number: this.page,
    size: this.size,
    numberOfElements: 0
  });

  clazz_id: number | undefined;

  // 初始化查询条件
  param = {name: '', sno: ''};
  queryForm = new FormGroup({
    name: new FormControl('', Validators.required),
    sno: new FormControl('', Validators.required),
  });

  constructor(private clazzService: ClazzService,
              private route: ActivatedRoute,
              private studentService: StudentService,
              private commonService: CommonService) {
  }

  ngOnInit(): void {
    this.clazz_id = +this.route.snapshot.params.clazz_id;
    this.loadByPage(0, this.param);
  }

  onDelete(id: number): void {
    console.log('即将删除学生：', id);
    this.commonService.confirm((confirm) => {
      if (confirm) {
        this.studentService.delete(id)
          .subscribe((success) => {
            console.log('学生删除成功', success);
            this.commonService.success();
            this.ngOnInit();
          }, error => {
            console.log('学生删除失败', error);
            this.commonService.error();
          });
      }
    });
  }

  loadByPage(page: number = 0, param: { name: string, sno: string}): void {
    console.log('loadByPage', page);
    Assert.isNumber(this.clazz_id, 'clazz_id不是number类型');
    this.clazzService.clazzMembers(this.clazz_id as number, page, this.size, param)
      .subscribe(pageData => {
        console.log('班级成员请求成功', pageData);
        this.pageData = pageData;
        this.page = page;
      }, error => {
        console.log('班级成员请求失败', error);
      });
  }

  onPage($event: number): void {
    const query = this.queryForm.value as {
      name: string,
      sno: string,
    };
    this.loadByPage($event, query);
  }

  onSubmit(): void {
    const query = this.queryForm.value as {
      name: string,
      sno: string,
    };
    this.loadByPage(0, query);
  }
}
