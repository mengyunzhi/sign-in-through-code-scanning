import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-schedule-add',
  templateUrl: './schedule-add.component.html',
  styleUrls: ['./schedule-add.component.css']
})
export class ScheduleAddComponent implements OnInit {

  lessons = [1, 2, 3, 4, 5];
  days = ['一', '二', '三', '四', '五', '六', '日'];
  weeks = [1, 2, 3, 4, 5, 6, 7, 8];
  rooms = [1, 2, 3, 4, 5];

  constructor() { }

  ngOnInit(): void {
  }

}
