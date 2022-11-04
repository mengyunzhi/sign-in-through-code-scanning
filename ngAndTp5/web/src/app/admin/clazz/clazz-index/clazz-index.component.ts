import {Component, OnInit} from '@angular/core';
import {Clazz} from '../../../entity/clazz';
import {Page} from '../../../entity/page';
import {ClazzService} from '../../../service/clazz.service';
import {CommonService} from '../../../service/common.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-clazz-student-index',
  templateUrl: './clazz-index.component.html',
  styleUrls: ['./clazz-index.component.css']
})
export class ClazzIndexComponent implements OnInit {
  page = 0;
  size = 2;

  pageData = new Page<Clazz>({
    content: [],
    number: this.page,
    size: this.size,
    numberOfElements: 0,
  });

  // 初始化查询条件
  param = {name: ''};
  queryForm = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  constructor(private clazzService: ClazzService,
              private commonService: CommonService) {
  }

  ngOnInit(): void {
    this.loadByPage(0, this.param);
  }

  loadByPage(page: number = 0, param: {name: string}): void {
    console.log('loadByPage', page);
    this.clazzService.page({page, size: this.size}, param)
      .subscribe(pagedate => {
        console.log('班级数据请求成功', pagedate);
        this.page = page;
        this.pageData = pagedate;
      }, error => {
        console.log('班级数据请求失败', error);
      });
  }

  onDelete(clazz_id: number): void {
    this.commonService.confirm((confirm) => {
      if (confirm) {
        this.clazzService.delete(clazz_id)
          .subscribe(success => {
              console.log('班级删除成功', success);
              this.commonService.success();
              this.ngOnInit();
            }, error => {
              console.log('班级删除失败', error);
              this.commonService.error();
            }
          );
      }
    });

  }

  onPage($event: number): void {
    const query = this.queryForm.value as {
      name: string,
    };
    this.loadByPage($event, query);
  }

  onSubmit(): void {
    const query = this.queryForm.value as {
      name: string,
    };
    this.loadByPage(0, query);
  }
}
