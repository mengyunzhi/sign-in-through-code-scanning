import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-add',
  templateUrl: './time-add.component.html',
  styleUrls: ['./time-add.component.css']
})
export class TimeAddComponent implements OnInit {

  lessons = [1, 2, 3, 4, 5];
  days = ['一', '二', '三', '四', '五', '六', '日'];
  weeks = [1, 2, 3, 4, 5, 6, 7, 8];
  rooms = [1, 2, 3, 4, 5];

  constructor() { }

  ngOnInit(): void {
  }

}
