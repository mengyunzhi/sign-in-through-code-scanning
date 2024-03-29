import { Component, OnInit } from '@angular/core';
import {ScheduleService} from '../../../../service/schedule.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CourseService} from '../../../../service/course.service';
import {Assert} from '@yunzhi/ng-mock-api';
import {Notify, Report} from 'notiflix';
import {CommonService} from '../../../../service/common.service';
import {CommonValidator} from '../../../../validator/common-validator';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-name-edit',
  templateUrl: './name-edit.component.html',
  styleUrls: ['./name-edit.component.css']
})
export class NameEditComponent implements OnInit {

  constructor(private scheduleService: ScheduleService,
              private route: ActivatedRoute,
              private courseService: CourseService,
              private router: Router,
              private commService: CommonService,
              private httpClient: HttpClient) {
    this.formGroup = new FormGroup({
      name : new FormControl('', [Validators.required, CommonValidator.nameMinLength, CommonValidator.nameMaxLength]),
      lesson : new FormControl(null, [Validators.required, CommonValidator.integer, Validators.min(1)]),
    });
  }
  formGroup: FormGroup;
  schedule_id: number | undefined;
  course_id: number | undefined;
  ngOnInit(): void {
    const commonValidator = new CommonValidator(this.httpClient);
    this.schedule_id = +this.route.snapshot.params.schedule_id;
    this.scheduleService.getById(this.schedule_id)
      .subscribe(schedule => {
        console.log('schedule name-edit', schedule);
        this.course_id = schedule.course.id;
        this.formGroup.get('name')?.setAsyncValidators(commonValidator.courseNameUnique(this.course_id));
        this.formGroup.get('name')?.setValue(schedule.course.name);
        this.formGroup.get('lesson')?.setValue(schedule.course.lesson);
      }, error => {
        console.log(error);
      });
  }

  onSubmit(): void {
    Assert.isNumber(this.course_id, 'course_id的类型不是number');
    this.courseService.update(this.course_id as number, this.formGroup.value)
      .subscribe(success => {
        console.log('课程更新成功', success);
        this.commService.success(() => this.router.navigate(['./../'], {relativeTo: this.route}));
      }, error => {
        console.log('课程更新失败', error);
        this.commService.error();
      });
  }

}
