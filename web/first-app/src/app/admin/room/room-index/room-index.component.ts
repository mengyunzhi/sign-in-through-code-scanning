import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Page} from '../../../entity/page';
import {Room} from '../../../entity/room';

@Component({
  selector: 'app-room-index',
  templateUrl: './room-index.component.html',
  styleUrls: ['./room-index.component.css']
})
export class RoomIndexComponent implements OnInit {
  page = 0;
  size = 10;

  pageData = new Page<Room>({
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
    this.httpClient.get<Page<Room>>('/room/page', {params: httpParams})
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
