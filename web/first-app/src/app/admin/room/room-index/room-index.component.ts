import { Component, OnInit } from '@angular/core';
import {Page} from '../../../entity/page';
import {Room} from '../../../entity/room';
import {RoomService} from '../../../service/room.service';

@Component({
  selector: 'app-room-index',
  templateUrl: './room-index.component.html',
  styleUrls: ['./room-index.component.css']
})
export class RoomIndexComponent implements OnInit {
  page = 0;
  size = 3;

  pageData = new Page<Room>({
    content: [],
    number: this.page,
    size: this.size,
    numberOfElements: 0
  });

  constructor(private roomService: RoomService) {

  }

  ngOnInit(): void {
    this.loadByPage();
  }

  /*
  * 获取页面数据
  * */
  loadByPage(page: number = 0): void {
    console.log('loadByPage', page);
    this.roomService.page({page, size: this.size})
      .subscribe(pageData => {
        console.log('请求成功---', pageData);
        this.page = page;
        this.pageData = pageData;
      });
  }

  onPage($event: number): void {
    console.log('onPage is called', $event);
    this.loadByPage($event);
  }
}
