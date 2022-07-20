import {Component, OnInit} from '@angular/core';
import {Term} from '../../../entity/term';
import {Page} from '../../../entity/page';
import {TermService} from '../../../service/term.service';
import {CommonService} from '../../../service/common.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-term',
  templateUrl: './term-index.component.html',
  styleUrls: ['./term-index.component.css']
})
export class TermIndexComponent implements OnInit {
  page = 0;
  size = 3;
  pageData = new Page<Term>({
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

  constructor(private termService: TermService,
              private commonService: CommonService,
  ) {
  }

  ngOnInit(): void {
    this.loadByPage(0, this.param);
  }

  /*
  * 激活学期
  * */
  activate(id: number): void {
    this.termService.activate(id)
      .subscribe(success => {
        console.log('激活成功', success);
        this.ngOnInit();
        this.commonService.success();
      }, error => {
        console.log('激活失败', error);
        this.commonService.error();
      });
  }

  /*
  * 删除学期
  * */
  onDelete(id: number): void {
    this.commonService.confirm((confirm) => {
      if (confirm) {
        this.termService.delete(id)
          .subscribe(success => {
            console.log('删除成功', success);
            this.commonService.success();
            this.ngOnInit();
          }, error => {
            console.log('删除失败', error);
            this.commonService.success();
          });
      }
    });
  }

  /*
  * 获取页面数据
  * */
  loadByPage(page: number = 0, param: {name: string}): void {
    console.log('loadByPage', page);
    this.termService.page({page, size: this.size}, param)
      .subscribe(pageData => {
        console.log('请求成功---', pageData);
        this.page = page;
        this.pageData = pageData;
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
