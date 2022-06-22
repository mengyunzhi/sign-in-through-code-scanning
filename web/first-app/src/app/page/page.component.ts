import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Page} from '../entity/page';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
  inputPage : Page<any> = new Page({
    content: [],
    number: 0,
    size: 1,
    numberOfElements: 0,
  });
  // 页数数组
  pages: number[] = [];
  currentPage: number = 0;

  @Input()
  set page(page: Page<any>) {
    console.log('set page被调用','当前页', this.inputPage.number,'总页数', this.inputPage.totalPages);
    this.inputPage = page;
    let maxCount;
    let begin;
    if (this.inputPage.totalPages > 7) {
      maxCount = 7;
      begin = this.inputPage.totalPages - 3;
      if (begin < 0) {
        begin = 0;
      } else if (begin > this.inputPage.totalPages - 7) {
        begin = this.inputPage.totalPages - 7;
      }
    } else {
      begin = 0;
      maxCount = this.inputPage.totalPages;
    }

    this.pages = [];
    for (let i = 0; i < maxCount; i++, begin++ ) {
      this.pages.push(begin);
    }
    // 设置当前页
    this.currentPage = this.inputPage.number;
  }

  @Output()
  bePageChange = new EventEmitter<number>();

  constructor() {

  }

  ngOnInit(): void {

  }

  onPage(page: number): void {
    console.log('bePageChange', page);
    this.bePageChange.emit(page);
  }

}
