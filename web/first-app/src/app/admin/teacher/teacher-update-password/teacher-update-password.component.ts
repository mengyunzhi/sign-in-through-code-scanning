import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {TeacherService} from '../../../service/teacher.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Assert} from '@yunzhi/ng-mock-api';
import {Notify, Report} from 'notiflix';

@Component({
  selector: 'app-teacher-update-password',
  templateUrl: './teacher-update-password.component.html',
  styleUrls: ['./teacher-update-password.component.css']
})
export class TeacherUpdatePasswordComponent implements OnInit {
  password = new FormControl('', Validators.required);

  constructor(private teacherService: TeacherService,
              private route: ActivatedRoute,
              private router: Router) { }

  id: number | undefined;
  name = '';
  ngOnInit(): void {
    // id为teacher所对应的user_id
    const id = this.route.snapshot.params.id;
    this.id = +id;
    this.teacherService.getById(this.id)
      .subscribe(teacher => {
        console.log('api教师获取成功', teacher);
        this.name = teacher.name;
      }, error => {
        console.log('api教师获取失败', error);
      });
  }

  onSubmit(): void {
    console.log('onsubmit is called');
    Assert.isNumber(this.id, 'id类型不是number');
    this.teacherService.updatePasswordByAdmin(this.id as number, this.password.value)
      .subscribe(success => {
        console.log('密码修改成功', success);
        this.router.navigate(['./../../'], {relativeTo: this.route});
        Notify.success('修改成功', {timeout: 1000});
      }, error => {
        console.log('密码修改失败', error);
        Report.failure('修改失败', '', '确定');
      });
  }

}
