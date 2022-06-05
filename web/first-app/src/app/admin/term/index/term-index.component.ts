import { Component, OnInit } from '@angular/core';
import {Term} from '../../../entity/term';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-term',
  templateUrl: './term-index.component.html',
  styleUrls: ['./term-index.component.css']
})
export class TermIndexComponent implements OnInit {
  terms = new Array<Term>();

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get<Array<Term>>('/term/index')
      .subscribe(terms => {
          console.log('mock-api请求成功', terms);
          this.terms = terms;
          console.log('已赋值完成');
        },
        error => console.log('mock-api请求失败', error));
  }

}
