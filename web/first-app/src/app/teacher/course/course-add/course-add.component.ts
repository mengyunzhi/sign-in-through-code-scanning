import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CourseService} from '../../../service/course.service';
import {Notify, Report} from 'notiflix';
import {ActivatedRoute, Router, Routes} from '@angular/router';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.css']
})
export class CourseAddComponent implements OnInit {

  formGroup = new FormGroup({
    name : new FormControl('', Validators.required),
    lesson : new FormControl(null, Validators.required),
  });

  constructor(private courseService: CourseService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log('保存');
    const course = this.formGroup.value as {
      name: string,
      lesson: number
    };
    console.log('111');
    console.log(course);
    console.log('222');
    this.courseService.add(course)
      .subscribe(success => {
          console.log('添加成功', success);
          this.router.navigate(['../'], {relativeTo: this.route});
          Notify.success('添加成功', {timeout: 1000});
        },
        error => {
          console.log('添加失败', error);
          Report.failure('添加失败', '', '确定');
        });
  }

}
