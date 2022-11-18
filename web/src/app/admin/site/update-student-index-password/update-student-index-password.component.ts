import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CommonService} from '../../../service/common.service';
import {UserService} from '../../../service/user.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-update-student-index-password',
  templateUrl: './update-student-index-password.component.html',
  styleUrls: ['./update-student-index-password.component.css']
})
export class UpdateStudentIndexPasswordComponent implements OnInit {

  formGroup = new FormGroup({
    firstNewPassword: new FormControl('', Validators.required),
    secondNewPassword: new FormControl('', Validators.required)
  });

  indexStudentPassword = '';

  constructor(private commonService: CommonService,
              private userService: UserService,
              private router: Router,
              private route: ActivatedRoute, ) { }

  ngOnInit(): void {
    this.userService.getDefaultPassword()
      .subscribe(success => {
        this.indexStudentPassword = success;
        console.log(this.indexStudentPassword);
      }, error => {
        console.log(error);
      });
  }

  onSubmit(): void {
    console.log(typeof(this.formGroup.get('firstNewPassword')?.value));
    console.log(this.formGroup.get('secondNewPassword')?.value);
    if (this.formGroup.get('firstNewPassword')?.value !== this.formGroup.get('secondNewPassword')?.value) {
      this.commonService.error(() => '', '', '两次输入的密码不一致');
    } else if (this.formGroup.get('firstNewPassword')?.value === '' && this.formGroup.get('secondNewPassword')?.value === '') {
      this.commonService.error(() => '', '', '新默认密码不可为空');
    } else {
      console.log('像后台传firstNewPassword');
      this.userService.updateDefaultPassword(this.formGroup.get('firstNewPassword')?.value)
        .subscribe(success => {
          console.log(success);
          this.commonService.success(() => this.router.navigate(['../'], {relativeTo: this.route}));
        }, error => {
          console.log(error);
        });
    }
  }

}
