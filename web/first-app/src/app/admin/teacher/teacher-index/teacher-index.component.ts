import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teacher-index',
  templateUrl: './teacher-index.component.html',
  styleUrls: ['./teacher-index.component.css']
})
export class TeacherIndexComponent implements OnInit {

  title = '教师管理';

  // 定义教师数组
  teachers = [{
    id: 1,
    name: '张三',
    sex: true,
    number: '111',
  }, {
    id: 2,
    name: '李四',
    sex: false,
    number: '222'
  },{
    id: 3,
    name: '王五',
    sex: false,
    number: '333'
  }];

  constructor() { }

  ngOnInit(): void {
  }

}
