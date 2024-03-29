import { Component, OnInit } from '@angular/core';
import {Page} from '../../../entity/page';
import {Student} from '../../../entity/student';
import {StudentService} from '../../../service/student.service';
import {ActivatedRoute} from '@angular/router';
import {Assert} from '@yunzhi/ng-mock-api';
import {StudentScheduleService} from '../../../service/studentSchedule.service';
import {Confirm} from 'notiflix';
import {CommonService} from '../../../service/common.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../entity/user';
import {ScheduleService} from '../../../service/schedule.service';
import {CourseService} from '../../../service/course.service';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit {
  size = 2;
  page = 0;

  queryForm = new FormGroup({
    clazz: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    sno: new FormControl('', Validators.required),
  });

  pageData = new Page<Student>({
    content: [],
    number: this.page,
    size: this.size,
    numberOfElements: 0
  });
  schedule_id: number | undefined;
  public courseName: string | undefined;
  constructor(private studentService: StudentService,
              private route: ActivatedRoute,
              private studentScheduleService: StudentScheduleService,
              private commonService: CommonService,
              private scheduleService: ScheduleService,
              private courseService: CourseService) { }

  ngOnInit(): void {
    this.schedule_id = +this.route.snapshot.params.schedule_id;
    this.loadByPage();
    this.scheduleService.getById(this.schedule_id)
      .subscribe(schedule => {
        const courseId = schedule.course.id;
        this.courseService.getById(courseId)
          .subscribe(course => {
            this.courseName = course.name;
          });
      });
  }

  loadByPage(page: number = 0): void {
    Assert.isNumber(this.schedule_id, 'schedule_id不是number类型');
    this.studentService.pageByScheduleId(page, this.size, this.schedule_id as number, this.queryForm.value)
      .subscribe(pagedata => {
        this.pageData = pagedata;
        this.page = page;
        console.log('c', pagedata);
      }, error => {
        console.log('学生数据请求失败', error);
      });
  }

  onPage($event: number): void {
    console.log('onpage is called', $event);
    this.loadByPage($event);
  }

  onDelete(student_id: number): void {
    this.commonService.confirm((confirm) => {
        if (confirm) {
          Assert.isNumber(this.schedule_id, 'schedule_id类型不是number');
          this.studentScheduleService.delete(student_id, this.schedule_id as number)
            .subscribe(success => {
              console.log('删除成功', success);
              this.loadByPage();
              this.commonService.success();
            }, error => {
              console.log('删除失败', error);
              this.commonService.error();
            });
        }
      },
    );
  }
}
