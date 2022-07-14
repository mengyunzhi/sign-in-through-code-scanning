import { Component, OnInit } from '@angular/core';
import {Room} from '../../../../entity/room';

@Component({
  selector: 'app-course-time',
  templateUrl: './course-time.component.html',
  styleUrls: ['./course-time.component.css']
})
export class CourseTimeComponent implements OnInit {

  constructor() { }

  h5_day: string | undefined;
  h5_lesson: number | undefined;
  weeks: number[] = [];
  rooms = [] as Room[];

  ngOnInit(): void {
  }

  isShow(day: string, lesson: number): void {
    console.log('出现模态框');
    this.h5_day = day;
    this.h5_lesson = lesson;
  }
}
