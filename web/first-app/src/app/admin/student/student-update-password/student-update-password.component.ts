import {Component, OnInit} from '@angular/core';
import {StudentService} from '../../../service/student.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
import {Assert} from '@yunzhi/ng-mock-api';
import {Notify, Report} from 'notiflix';

@Component({
  selector: 'app-student-update-password',
  templateUrl: './student-update-password.component.html',
  styleUrls: ['./student-update-password.component.css']
})
export class StudentUpdatePasswordComponent implements OnInit {

  password = new FormControl('', Validators.required);
  id: number | undefined;
  name = '';

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    // id为teacher所对应的user_id
    const id = this.route.snapshot.params.id;
    this.id = +id;
    this.studentService.getById(this.id)
      .subscribe(student => {
        console.log('api学生获取成功', student);
        this.name = student.name;
      }, error => {
        console.log('api学生获取失败', error);
      });
  }

  onSubmit(): void {
    console.log('onsubmit is called');
    Assert.isNumber(this.id, 'id类型不是number');
    this.studentService.updatePasswordByAdmin(this.id as number, this.password.value)
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
