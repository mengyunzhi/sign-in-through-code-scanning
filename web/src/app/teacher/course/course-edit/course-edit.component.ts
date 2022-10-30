import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {CourseService} from '../../../service/course.service';
import {DatePipe} from '@angular/common';
import {Assert} from '@yunzhi/ng-mock-api';
import {CommonService} from '../../../service/common.service';
import {CommonValidator} from '../../../validator/common-validator';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css']
})
export class CourseEditComponent implements OnInit {

  formGroup: FormGroup;
  id: number | undefined;

  constructor(private httpClient: HttpClient,
              private route: ActivatedRoute,
              private courseService: CourseService,
              private datePipe: DatePipe,
              private router: Router,
              private commService: CommonService) {
    this.id = +this.route.snapshot.params.id;
    const commonValidator = new CommonValidator(httpClient);
    this.formGroup = new FormGroup({
      name : new FormControl('', [Validators.required, CommonValidator.nameMinLength, CommonValidator.nameMaxLength],
        commonValidator.courseNameUnique(this.id)),
      lesson : new FormControl(null, [Validators.required, CommonValidator.integer, Validators.min(1)]),
    });
  }

  ngOnInit(): void {
    this.loadData(this.id);
  }

  loadData(id: number | undefined): void {
    Assert.isNumber(id, 'id类型错误');
    this.courseService.getById(id as number)
      .subscribe(course => {
        console.log('初始化获取course', course);
        this.formGroup.get('name')?.setValue(course.name);
        this.formGroup.get('lesson')?.setValue(course.lesson);
      }, error => console.log('初始化获取course失败', error));
  }

  onSubmit(): void {
    this.courseService.update(this.id as number, {
      name: this.formGroup.get('name')?.value,
      lesson: this.formGroup.get('lesson')?.value,
    }).subscribe(success => {
      console.log('课程更新成功');
      this.commService.success(() => this.router.navigate(['./../../'], {relativeTo: this.route}));
    }, error => {
      console.log('更新失败', error);
      this.commService.error();
    });
  }
}
