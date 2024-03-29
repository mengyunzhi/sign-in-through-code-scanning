import {Component, OnInit} from '@angular/core';
import {Room} from '../../../entity/room';
import {RoomService} from '../../../service/room.service';
import {CommonService} from '../../../service/common.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Page} from '../../../entity/page';

@Component({
  selector: 'app-room-index',
  templateUrl: './room-index.component.html',
  styleUrls: ['./room-index.component.css']
})
export class RoomIndexComponent implements OnInit {
  page = 0;
  size = 2;

  pageData = new Page<Room>({
    content: [],
    number: this.page,
    size: this.size,
    numberOfElements: 0
  });

  // 初始化查询条件
  param = {name: '', capacity: ''};
  queryForm = new FormGroup({
    name: new FormControl('', Validators.required),
    capacity: new FormControl('', Validators.required),
  });

  constructor(private roomService: RoomService,
              private commonService: CommonService) {
  }

  ngOnInit(): void {
    this.loadByPage(0, this.param);
  }

  /*
  * 获取页面数据
  * */
  loadByPage(page: number = 0, param: {name: string, capacity: string}): void {
    console.log('loadByPage', page);
    this.roomService.page({page, size: this.size}, param)
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
    this.commonService.confirm(confirm => {
        if (confirm) {
          this.roomService.delete(id)
            .subscribe(success => {
              console.log('删除成功', success);
              this.ngOnInit();
              this.commonService.success();
            }, error => {
              console.log('删除失败', error);
              this.commonService.error();
            });
        }
      },
    );
  }

  onPage($event: number): void {
    const query = this.queryForm.value as {
      name: string,
      capacity: string,
    };
    this.loadByPage($event, query);
  }

  onSubmit(): void {
    const query = this.queryForm.value as {
      name: string,
      capacity: string,
    };
    this.loadByPage(0, query);
  }
}
