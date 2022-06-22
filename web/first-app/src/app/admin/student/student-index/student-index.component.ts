import { Component, OnInit } from '@angular/core';
import {Student} from '../../../entity/student';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Page} from '../../../entity/page';

@Component({
  selector: 'app-student-student-index',
  templateUrl: './student-index.component.html',
  styleUrls: ['./student-index.component.css']
})
export class StudentIndexComponent implements OnInit {
  // 默认显示第一页内容
  page = 0;
  // 每页默认5条
  size = 5;

  // 初始化一个有0条数据的分页
  pageDate = new Page<Student>({
    content: [],
    number: this.page,
    size: this.size,
    numberOfElements: 0
  });

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.loadByPage();
  }

  onPage(page: number): void {
    this.loadByPage(page);
  }

  loadByPage(page = 0): void {
    console.log('触发loadByPage方法');
    const httpParams = new HttpParams().append('page', page.toString())
      .append('size', this.size.toString());
    this.httpClient.get<Page<Student>>('/student/page', {params: httpParams})
      .subscribe(pageDate => {
        // 请求数据之后设置当前页
        this.page = page;
        console.log('student组件接收到返回数据，重置pageDate');
        this.pageDate = pageDate;
        console.log(pageDate);
      });
  }
}
