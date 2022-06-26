import { Component, OnInit } from '@angular/core';
import {Page} from '../../../entity/page';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Schedule} from '../../../entity/schedule';

@Component({
  selector: 'app-task-index',
  templateUrl: './task-index.component.html',
  styleUrls: ['./task-index.component.css']
})
export class TaskIndexComponent implements OnInit {

  page = 0;
  size = 10;

  pageData = new Page<Schedule>({
    content: [],
    number: this.page,
    size: this.size,
    numberOfElements: 0
  });

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.loadByPage();
  }

  loadByPage(page: number = 0): void {
    const httpParams = new HttpParams().append('page', page.toString())
      .append('size', this.size.toString());
    this.httpClient.get<Page<Schedule>>('/task/page', {params: httpParams})
      .subscribe(pageData => {
        console.log('请求成功', pageData);
        this.page = page;
        this.pageData = pageData;
      });
  }

  onPage($event: number): void {
    this.loadByPage($event);
  }

}
