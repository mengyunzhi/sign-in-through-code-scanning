import { Component, OnInit } from '@angular/core';
import {Form, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProgramService} from '../../../../service/program.service';
import {ScheduleService} from '../../../../service/schedule.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Course} from '../../../../entity/course';
import {Notify, Report} from 'notiflix';
import {CommonService} from '../../../../service/common.service';
import {CommonValidator} from '../../../../validator/common-validator';
import {HttpClient} from '@angular/common/http';
import {CourseService} from '../../../../service/course.service';

@Component({
  selector: 'app-program-add',
  templateUrl: './program-add.component.html',
  styleUrls: ['./program-add.component.css']
})
export class ProgramAddComponent implements OnInit {
  formGroup: FormGroup;
  private courseName: string | undefined;

  constructor(private programService: ProgramService,
              private scheduleService: ScheduleService,
              private route: ActivatedRoute,
              private router: Router,
              private commonService: CommonService,
              private httpClient: HttpClient,
              private courseService: CourseService) {
    const commonValidator = new CommonValidator(httpClient);
    this.formGroup = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required, CommonValidator.nameMinLength, CommonValidator.nameMaxLength]),
        commonValidator.programNameUnique()),
      lesson: new FormControl(null, Validators.compose([Validators.required, Validators.min(1), CommonValidator.integer])),
    });
  }

  course = {} as Course;
  schedule_id: number | undefined;
  ngOnInit(): void {
    this.schedule_id = +this.route.snapshot.params.schedule_id;
    console.log('schedule_id:', this.schedule_id);
    this.scheduleService.getById(this.schedule_id)
      .subscribe(schedule => {
        console.log('schedule program-add', schedule);
        this.course = schedule.course;
      }, error => {
        console.log(error);
      });
    this.scheduleService.getById(this.schedule_id)
      .subscribe(schedule => {
        const courseId = schedule.course.id;
        this.courseService.getById(courseId)
          .subscribe(course => {
            this.courseName = course.name;
          });
      });
  }
  onSubmit(): void {
    if (this.course.id) {
      this.programService.add({
        name: this.formGroup.get('name')?.value,
        lesson: this.formGroup.get('lesson')?.value,
        courseId: this.course.id,
      }).subscribe(success => {
        console.log('项目添加成功', success);
        this.commonService.success(() => this.router.navigate(['../'], {relativeTo: this.route}));
      }, error => {
        console.log('项目添加失败', error);
        this.commonService.error();
      });
    }
  }

}
