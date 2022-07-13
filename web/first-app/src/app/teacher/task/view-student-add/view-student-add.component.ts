import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {StudentScheduleService} from '../../../service/studentSchedule.service';
import {Clazz} from '../../../entity/clazz';
import {Student} from '../../../entity/student';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Assert} from '@yunzhi/ng-mock-api';
import {Notify, Report} from 'notiflix';

@Component({
  selector: 'app-view-student-add',
  templateUrl: './view-student-add.component.html',
  styleUrls: ['./view-student-add.component.css']
})
export class ViewStudentAddComponent implements OnInit {

  schedule_id: number | undefined;
  formGroup = new FormGroup({
    index: new FormControl(null, Validators.required),
    student_id: new FormControl(null, Validators.required),
  });
  clazzes = [] as Clazz[];
  students = [] as Student[][];
  studentIds = [] as number[];
  // 标志数据是否返回，另外三个数据不足以作为判断标准
  flag = 0;
  constructor(private route: ActivatedRoute,
              private studentScheduleService: StudentScheduleService,
              private router: Router) { }

  ngOnInit(): void {
    this.schedule_id = +this.route.snapshot.params.schedule_id;
    this.studentScheduleService.getForAddByScheduleId(this.schedule_id)
      .subscribe(data => {
        console.log('ViewStudentAddComponent 请求成功', data);
        this.flag = 1;
        this.clazzes = data.clazzes;
        this.studentIds = data.studentIds;
        for (const students of data.students) {
          this.students.push(students.filter(stu => !this.studentIds.includes(stu.id)));
        }
      }, error => {
        console.log('请求失败', error);
      });
  }

  onSubmit(): void {
    Assert.isNumber(this.schedule_id, 'schedule_id类型不是number');
    this.studentScheduleService.add({
      student_id: this.formGroup.get('student_id')?.value,
      schedule_id: this.schedule_id as number
    })
      .subscribe(success => {
        console.log('添加成功', success);
        this.router.navigate(['../'], {relativeTo: this.route});
        Notify.success('添加成功', {timeout: 1000});
      }, error => {
        console.log('添加失败', error);
        Report.failure('添加失败', '', '确定');
      });
  }

}
