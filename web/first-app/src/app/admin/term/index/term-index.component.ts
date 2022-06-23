import { Component, OnInit } from '@angular/core';
import {Term} from '../../../entity/term';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Page} from '../../../entity/page';

@Component({
  selector: 'app-term',
  templateUrl: './term-index.component.html',
  styleUrls: ['./term-index.component.css']
})
export class TermIndexComponent implements OnInit {
  page = 0;
  size = 10;

  pageData = new Page<Term>({
    content: [],
    number: this.page,
    size: this.size,
    numberOfElements: 0,
  });
  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.loadByPage();

    // this.httpClient.get('http://localhost/angular/api/public/index/login/test')
    //   .subscribe(data => {
    //     console.log('请求成功', data);
    //   }, error => {
    //     console.log('请求失败', error);
    //   });
  }

  loadByPage(page: number = 0) {
    console.log('loadByPage', page);
    const httpParams = new HttpParams().append('page', page.toString())
      .append('size', this.size.toString());
    this.httpClient.get<Page<Term>>('/term/page', {params: httpParams})
      .subscribe(pageData => {
        console.log('请求成功', pageData);
        this.page = page;
        this.pageData = pageData;
      })
  }

  onPage($event: number) {
    console.log('onPage is called', $event);
    this.loadByPage($event);
  }

}
