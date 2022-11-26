import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {StudentScheduleService} from '../../../service/studentSchedule.service';
import {Clazz} from '../../../entity/clazz';
import {Student} from '../../../entity/student';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Assert} from '@yunzhi/ng-mock-api';
import {Notify, Report} from 'notiflix';
import {CommonService} from '../../../service/common.service';

@Component({
  selector: 'app-view-student-add',
  templateUrl: './view-student-add.component.html',
  styleUrls: ['./view-student-add.component.css']
})
export class ViewStudentAddComponent implements OnInit {

  selectClazzId: number | undefined;
  schedule_id: number | undefined;
  formGroup = new FormGroup({
    class_id: new FormControl(null, Validators.required),
    student_id: new FormControl(null, Validators.required),
  });
  clazzes = [] as Clazz[];
  students = [] as Student[];
  studentIds = [] as number[];
  // 标志数据是否返回，另外三个数据不足以作为判断标准
  flag = 0;
  constructor(private route: ActivatedRoute,
              private studentScheduleService: StudentScheduleService,
              private router: Router,
              private commonService: CommonService) { }

  ngOnInit(): void {
    this.schedule_id = +this.route.snapshot.params.schedule_id;
    this.studentScheduleService.getForAddByScheduleId(this.schedule_id)
      .subscribe(data => {
        console.log('ViewStudentAddComponent 请求成功', data);
        this.flag = 1;
        this.clazzes = data.clazzes;
        this.studentIds = data.studentIds;


        for (const student of data.students) {
          // @ts-ignore
          if (data.studentIds.indexOf(student.id) === -1) {
            // @ts-ignore
            this.students.push(student);
          }
        }
      }, error => {
        console.log('请求失败', error);
      });
  }

  onSubmit(): void {
    Assert.isNumber(this.schedule_id, 'schedule_id类型不是number');
    this.studentScheduleService.add({
      studentId: this.formGroup.get('student_id')?.value,
      scheduleId: this.schedule_id as number
    })
      .subscribe(success => {
        console.log('添加成功', success);
        this.commonService.success(() => this.router.navigate(['../'], {relativeTo: this.route}));
      }, error => {
        console.log('添加失败', error);
        this.commonService.error();
      });
  }

  onChange(id: number): void {
    this.selectClazzId = + id;
    console.log(typeof this.selectClazzId);
  }
}
