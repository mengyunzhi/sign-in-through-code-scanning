import { Component, OnInit } from '@angular/core';
import {Clazz} from '../../../entity/clazz';
import {Page} from '../../../entity/page';
import {Term} from '../../../entity/term';
import {HttpClient, HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-clazz-student-index',
  templateUrl: './clazz-index.component.html',
  styleUrls: ['./clazz-index.component.css']
})
export class ClazzIndexComponent implements OnInit {
  page = 0;
  size = 10;

  pageData = new Page<Clazz>({
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
    this.httpClient.get<Page<Clazz>>('/clazz/page', {params: httpParams})
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
