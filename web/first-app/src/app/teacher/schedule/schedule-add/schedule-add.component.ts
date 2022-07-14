import { Component, OnInit } from '@angular/core';
import {ScheduleService} from '../../../service/schedule.service';
import {Course} from '../../../entity/course';
import {Clazz} from '../../../entity/clazz';
import {Room} from '../../../entity/room';
import {FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-schedule-add',
  templateUrl: './schedule-add.component.html',
  styleUrls: ['./schedule-add.component.css']
})
export class ScheduleAddComponent implements OnInit {
  formGroup = new FormGroup({
    course_id: new FormControl('', Validators.required),
    clazz_id: new FormControl(null, Validators.required),
  });

  constructor(private scheduleService: ScheduleService) { }

  lessons = [1, 2, 3, 4, 5];
  days = ['一', '二', '三', '四', '五', '六', '日'];
  weeks: number[] = [];
  rooms = [] as Room[];

  courses =  []  as Course[];
  Clazzes = [] as Clazz[];

  /* 检测：如果当前没有选择课程，那么班级也不应该被选择 */
  detect(): void {
    if (this.formGroup.get('course_id')?.value === '') {
      this.formGroup.get('clazz_id')?.setValue(null);
    }
  }

  ngOnInit(): void {
    this.getCourses();
    this.getClazzes();
    this.getRooms();
    this.getWeeks();
  }

  getCourses(): void {
    this.scheduleService.getCourses()
      .subscribe(data => {
        console.log('获取可选择课程成功', data);
        this.courses = data;
      }, error => {
        console.log('获取可可选择的课程失败', error);
    });
  }

  getClazzes(): void {
    this.scheduleService.getClazzes()
      .subscribe(data => {
        console.log('获取可选择班级成功', data);
        this.Clazzes = data;
      }, error => {
        console.log('获取可可选择的班级失败', error);
      });
  }

  getRooms(): void {
    this.scheduleService.getRooms()
      .subscribe(data => {
        console.log('获取可选择教室成功', data);
        this.rooms = data;
      }, error => {
        console.log('获取可可选择的教室失败', error);
      });
  }

  getWeeks(): void {
    this.scheduleService.getCurrentTerm()
      .subscribe(term => {
        console.log('获取可选择周数成功', term);
        const dateStart = +term.start_time;
        const dateEnd = +term.end_time;
        console.log(dateStart);
        console.log(dateEnd);

        const difValue = (dateEnd - dateStart) / (60 * 60 * 24);

        console.log(difValue);
        for (let i = 0; i < Math.ceil(difValue / 7); i++) {
          this.weeks.push(i + 1);
        }

        console.log(this.weeks);

      }, error => {
        console.log('获取可可选择的周数失败', error);
      });
  }
}
