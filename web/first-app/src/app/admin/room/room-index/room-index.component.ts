import {Component, OnInit} from '@angular/core';
import {Page} from '../../../entity/page';
import {Room} from '../../../entity/room';
import {RoomService} from '../../../service/room.service';
import {Confirm, Notify} from 'notiflix';
import {CommonService} from '../../../service/common.service';

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

  constructor(private roomService: RoomService,
              private commonService: CommonService) {

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

  /*
  * 删除教室
  * */
  onDelete(id: number): void {
    console.log(id);
    Confirm.show(
      '请确认',
      '该操作不可逆',
      '确认',
      '取消',
      () => {
        this.roomService.delete(id)
          .subscribe(success => {
            console.log('删除成功', success);
            this.ngOnInit();
            this.commonService.success();
          }, error => {
            console.log('删除失败', error);
            this.commonService.error();
          });
      },
    );
  }

  onPage($event: number): void {
    console.log('onPage is called', $event);
    this.loadByPage($event);
  }
}
