import { Component, OnInit } from '@angular/core';
import {Term} from '../../../entity/term';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Page} from '../../../entity/page';
import {TermService} from '../../../service/term.service';
import {of} from 'rxjs';

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
  constructor(private termService: TermService,
              private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.loadByPage();
  }

  loadByPage(page: number = 0): void {
    // console.log('loadByPage', page);
    // this.termService.page({page, size: this.size})
    //   .subscribe(pageData => {
    //     console.log('请求成功', pageData);
    //     this.page = page;
    //     this.pageData = pageData;
    //   });
    this.httpClient.get<Term[]>('http://localhost:8080/api/angular/api/public/api/index/index')
      .subscribe(terms => {
        this.pageData = new Page<Term>({
          content: terms,
          number: page,
          size: this.size,
          numberOfElements: terms.length,
        });
      });
  }

  onPage($event: number): void {
    console.log('onPage is called', $event);
    this.loadByPage($event);
  }
}
