import { Component, OnInit } from '@angular/core';
import {Page} from '../../../entity/page';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Teacher} from '../../../entity/teacher';

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

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.loadByPage();
  }

  loadByPage(page: number = 0): void {
    console.log('loadByPage', page);
    const httpParams = new HttpParams().append('page', page.toString())
      .append('size', this.size.toString());
    this.httpClient.get<Page<Teacher>>('/teacher/page', {params: httpParams})
      .subscribe(pageData => {
        console.log('请求成功', pageData);
        this.page = page;
        this.pageData = pageData;
      });
  }

  onPage($event: number): void {
    console.log('onPage is called', $event);
    this.loadByPage($event);
  }

}
