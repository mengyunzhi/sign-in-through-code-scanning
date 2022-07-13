import { Component, OnInit } from '@angular/core';
import {ScheduleService} from '../../../service/schedule.service';
import {Course} from '../../../entity/course';
import {Clazz} from '../../../entity/clazz';
import {Room} from '../../../entity/room';


@Component({
  selector: 'app-schedule-add',
  templateUrl: './schedule-add.component.html',
  styleUrls: ['./schedule-add.component.css']
})
export class ScheduleAddComponent implements OnInit {

  constructor(private scheduleService: ScheduleService) { }

  lessons = [1, 2, 3, 4, 5];
  days = ['一', '二', '三', '四', '五', '六', '日'];
  weeks = [];
  rooms = [] as Room[];
  h5_day: string | undefined;
  h5_lesson: number | undefined;

  courses =  []  as Course[];
  Clazzes = [] as Clazz[];
  isShowSelectClazz = false;
  isShowSelectTime = false;

  ngOnInit(): void {
    this.getSelectedCourses();
    this.getSelectedClazzes();
    this.getSelectedRooms();
    this.getSelectedWeeks();
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
        this.courses = data;
      }, error => {
        console.log('获取可可选择的课程失败', error);
    });
  }

  getSelectedClazzes(): void {
    this.scheduleService.getSelectedClazzes()
      .subscribe(data => {
        console.log('获取可选择班级成功', data);
        this.Clazzes = data;
      }, error => {
        console.log('获取可可选择的班级失败', error);
      });
  }

  getSelectedRooms(): void {
    this.scheduleService.getSelectedRooms()
      .subscribe(data => {
        console.log('获取可选择教室成功', data);
        this.rooms = data;
      }, error => {
        console.log('获取可可选择的教室失败', error);
      });
  }

  getSelectedWeeks(): void {
    this.scheduleService.getCurrentTerm()
      .subscribe(term => {
        console.log('获取可选择周数成功', term);
        const dateStart = new Date((+term.start_time) * 1000);
        const dateEnd = new Date((+term.end_time) * 1000);

        console.log(dateStart);
        console.log(dateEnd);

        const difValue = (dateEnd - dateStart) / (1000 * 60 * 60 * 24);

        console.log(difValue);
        for (let i = 0; i < Math.ceil(difValue / 7); i++) {
          this.weeks.push(i + 1);
        }

        console.log(this.weeks);

      }, error => {
        console.log('获取可可选择的周数失败', error);
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
