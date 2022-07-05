import { Component, OnInit } from '@angular/core';
import {ClazzService} from '../../../service/clazz.service';
import {ActivatedRoute} from '@angular/router';
import {Assert} from '@yunzhi/ng-mock-api';
import {Page} from '../../../entity/page';
import {Student} from '../../../entity/student';

@Component({
  selector: 'app-clazz-members',
  templateUrl: './clazz-members.component.html',
  styleUrls: ['./clazz-members.component.css']
})
export class ClazzMembersComponent implements OnInit {
  page = 0;
  size = 10;

  pageData = new Page<Student>({
    content: [],
    number: this.page,
    size: this.size,
    numberOfElements: 0
  });

  clazz_id: number | undefined;

  constructor(private clazzService: ClazzService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.clazz_id = +this.route.snapshot.params.clazz_id;
    this.loadByPage();
  }

  loadByPage(page = 0): void {
    console.log('loadByPage', page);
    Assert.isNumber(this.clazz_id, 'clazz_id不是number类型');
    this.clazzService.clazzMembers(this.clazz_id as number, page, this.size)
      .subscribe(pageData => {
        console.log('班级成员请求成功', pageData);
        this.pageData = pageData;
        this.page = page;
      }, error => {
        console.log('班级成员请求失败', error);
      });
  }

  onPage($event: number): void {
    this.loadByPage($event);
  }
}
