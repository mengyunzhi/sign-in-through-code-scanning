import { Component, OnInit } from '@angular/core';
import {Page} from '../../../entity/page';
import {Student} from '../../../entity/student';
import {HttpClient, HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit {
  size = 20;
  page = 0;

  pageData = new Page<Student>({
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
    const httpParams = new HttpParams().append('size', this.size.toString())
      .append('page', page.toString());
    this.httpClient.get<Page<Student>>('/task/viewStudent/page', {params: httpParams})
      .subscribe(pageData => {
        this.page = page;
        this.pageData = pageData;
      }, error => console.log('请求失败', error));
  }

  onPage($event: number): void {
    this.loadByPage($event);
  }
}
