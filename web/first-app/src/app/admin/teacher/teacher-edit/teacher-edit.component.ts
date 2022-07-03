import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TeacherService} from '../../../service/teacher.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Assert} from '@yunzhi/ng-mock-api';
import {Notify, Report} from 'notiflix';

@Component({
  selector: 'app-teacher-edit',
  templateUrl: './teacher-edit.component.html',
  styleUrls: ['./teacher-edit.component.css']
})
export class TeacherEditComponent implements OnInit {

  formGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    sex: new FormControl(0, Validators.required),
    number: new FormControl(null)
  });
  id: number | undefined;
  constructor(private teacherService: TeacherService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    // id为teacher所对应的user_id
    const id = this.route.snapshot.params.id;
    this.id = +id;
    this.teacherService.getById(this.id)
      .subscribe(teacher => {
        console.log('api教师获取成功', teacher);
        this.formGroup.get('name')?.setValue(teacher.name);
        this.formGroup.get('sex')?.setValue(teacher.sex);
        this.formGroup.get('number')?.setValue(teacher.number);
      }, error => {
        console.log('api教师获取失败', error);
      });
  }

  onSubmit(): void {
    Assert.isNumber(this.id, 'id类型不是number');
    this.teacherService.update(this.id as number, {
      name: this.formGroup.get('name')?.value,
      sex: this.formGroup.get('sex')?.value,
      number: this.formGroup.get('number')?.value,
    })
      .subscribe(success => {
        console.log('教师更新成功', success);
        this.router.navigate(['./../../'], {relativeTo: this.route});
        Notify.success('更新成功', {timeout: 1000});
      }, error => {
        console.log('教师更新失败', error);
        Report.failure('更新失败', '', '确定');
      });

  }
}
