import { Component, OnInit } from '@angular/core';
import {ScheduleService} from '../../../service/schedule.service';
import {Course} from '../../../entity/course';
import {Clazz} from '../../../entity/clazz';


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

  selectedCourses =  []  as Course[];
  selectedClazzes = [] as Clazz[];
  isShowSelectClazz = false;
  isShowSelectTime = false;

  constructor(private scheduleService: ScheduleService) { }

  ngOnInit(): void {
    this.getSelectedCourses();
    this.getSelectedClazzes();
  }


  isShow(day: string, lesson: number): void {
    console.log('出现模态框');
    this.h5_day = day;
    this.h5_lesson = lesson;
  }

  getSelectedCourses(): void {
    this.scheduleService.getSelectedCourses()
      .subscribe(data => {
        console.log('获取可选择课程成功', data);
        this.selectedCourses = data;
      }, error => {
        console.log('获取可可选择的课程失败', error);
    });
  }

  getSelectedClazzes(): void {
    this.scheduleService.getSelectedClazzes()
      .subscribe(data => {
        console.log('获取可选择班级成功', data);
        this.selectedClazzes = data;
      }, error => {
        console.log('获取可可选择的班级失败', error);
      });
  }

  open(): void {
    this.isShowSelectClazz = true;
  }

  close(): void {
    this.isShowSelectClazz = false;
    this.isShowSelectTime = false;
  }

  openTime(): void {
    this.isShowSelectTime = true;
  }

  closeTime(): void {
    this.isShowSelectTime = false;
  }
}
