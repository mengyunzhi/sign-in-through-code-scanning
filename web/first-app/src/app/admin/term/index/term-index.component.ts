import { Component, OnInit } from '@angular/core';
import {Term} from '../../../entity/term';
import {Page} from '../../../entity/page';
import {TermService} from '../../../service/term.service';
import {Confirm, Notify} from 'notiflix';

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
  constructor(private termService: TermService) { }

  ngOnInit(): void {
    this.loadByPage();
  }

  /*
  * 激活学期
  * */
  activate(id: number): void {
    this.termService.activate(id)
      .subscribe(success => {
        console.log('激活成功', success);
        this.ngOnInit();
        Notify.success(
          '激活成功',
          {
            timeout: 600,
          },
        );
      }, error => {
        console.log('激活失败', error);
        Notify.failure('激活失败');
      });
  }

  /*
  * 删除学期
  * */
  onDelete(id: number): void {
    Confirm.show(
      '请确认',
      '该操作不可逆',
      '确认',
      '取消',
      () => {
        this.termService.delete(id)
          .subscribe(success => {
            console.log('删除成功', success);
            this.ngOnInit();
            Notify.success('删除成功', {
              timeout: 400
            });
          }, error => {
            console.log('删除失败', error);
          });
      },
    );
  }

  /*
  * 获取页面数据
  * */
  loadByPage(page: number = 0): void {
    console.log('loadByPage', page);
    this.termService.page({page, size: this.size})
      .subscribe(pageData => {
        console.log('请求成功---', pageData);
        this.page = page;
        this.pageData = pageData;
      });
  }

  onPage($event: number): void {
    console.log('onPage is called', $event);
    this.loadByPage($event);
  }

}
