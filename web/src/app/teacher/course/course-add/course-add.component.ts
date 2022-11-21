import { Component, OnInit } from '@angular/core';
import {Form, FormControl, FormGroup, Validators} from '@angular/forms';
import {CourseService} from '../../../service/course.service';
import {Notify, Report} from 'notiflix';
import {ActivatedRoute, Router, Routes} from '@angular/router';
import {CommonService} from '../../../service/common.service';
import {CommonValidator} from '../../../validator/common-validator';
import {Validator} from '../../../validator/validator';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.css']
})
export class CourseAddComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private courseService: CourseService,
              private router: Router,
              private route: ActivatedRoute,
              private commonService: CommonService,
              private httpClient: HttpClient) {
    const commonValidator = new CommonValidator(httpClient);
    this.formGroup = new FormGroup({
      name : new FormControl('', [Validators.required, CommonValidator.nameMinLength, CommonValidator.nameMaxLength],
        commonValidator.courseNameUnique()),
      lesson : new FormControl(null, [Validators.required, CommonValidator.integer, Validators.min(1)]),
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log('保存');
    const course = this.formGroup.value as {
      name: string,
      lesson: number
    };
    this.courseService.add(course)
      .subscribe(success => {
          console.log('添加成功', success);
          this.commonService.success(() => this.router.navigate(['../'], {relativeTo: this.route}));
        },
        error => {
          console.log('添加失败', error);
          this.commonService.error();
        });
  }

}
