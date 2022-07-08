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
  h5_day: string | undefined;
  h5_lesson: number | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  isShow(day: string, lesson: number): void {
    console.log('出现模态框');
    this.h5_day = day;
    this.h5_lesson = lesson;
  }
}
