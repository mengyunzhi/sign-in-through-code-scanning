import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {CourseService} from '../../../service/course.service';
import {DatePipe} from '@angular/common';
import {Assert} from '@yunzhi/ng-mock-api';

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
              private router: Router) {
    this.formGroup = new FormGroup({
      name : new FormControl('', Validators.required),
      lesson : new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    const  id = this.route.snapshot.params.id;
    this.id = +id;
    this.loadData(+id);
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

}
