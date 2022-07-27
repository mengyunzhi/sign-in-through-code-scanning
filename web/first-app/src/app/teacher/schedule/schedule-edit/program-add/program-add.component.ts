import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProgramService} from '../../../../service/program.service';
import {ScheduleService} from '../../../../service/schedule.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Course} from '../../../../entity/course';
import {Notify, Report} from 'notiflix';
import {CommonService} from '../../../../service/common.service';
import {CommonValidator} from '../../../../validator/common-validator';

@Component({
  selector: 'app-program-add',
  templateUrl: './program-add.component.html',
  styleUrls: ['./program-add.component.css']
})
export class ProgramAddComponent implements OnInit {
  formGroup = new FormGroup({
    name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(25)])),
    lesson: new FormControl(null, Validators.compose([Validators.required, Validators.min(1), CommonValidator.integer])),
  });

  constructor(private programService: ProgramService,
              private scheduleService: ScheduleService,
              private route: ActivatedRoute,
              private router: Router,
              private commonService: CommonService) { }

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
  }
  onSubmit(): void {
    if (this.course.id) {
      this.programService.add({
        name: this.formGroup.get('name')?.value,
        lesson: this.formGroup.get('lesson')?.value,
        course_id: this.course.id,
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
