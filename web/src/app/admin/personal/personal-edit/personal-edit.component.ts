import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../service/user.service';
import {Assert} from '@yunzhi/ng-mock-api';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '../../../service/common.service';
import {CommonValidator} from '../../../validator/common-validator';
import {Validator} from '../../../validator/validator';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-personal-edit',
  templateUrl: './personal-edit.component.html',
  styleUrls: ['./personal-edit.component.css']
})
export class PersonalEditComponent implements OnInit {

  formGroup: FormGroup = new FormGroup({
    name: new FormControl('', Validators.compose([Validators.required, CommonValidator.nameMinLength, CommonValidator.nameMaxLength])),
    sex: new FormControl(null, Validators.compose([Validators.required, CommonValidator.sex])),
    role: new FormControl(null, Validators.required),
    number: new FormControl('', [Validators.required, Validator.isPhoneNumber]),
    password: new FormControl('', Validators.compose([Validators.minLength(4), Validators.maxLength(40)])),
    newPassword: new FormControl('', Validators.compose([Validators.minLength(4), Validators.maxLength(40)])),
    newPasswordAgain: new FormControl('', Validators.compose([Validators.minLength(4), Validators.maxLength(40)]))
  });

  userNumber: string | undefined;
  password: string | undefined;
  id: number | undefined;
  constructor(private userService: UserService,
              private router: Router,
              private route: ActivatedRoute,
              private commonService: CommonService,
              private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.userNumber = window.sessionStorage.getItem('userNumber');
    console.log('getCurrentLoginUserNumber', this.userNumber);
    // @ts-ignore
    this.userService.getCurrentLoginUser(this.userNumber)
      .subscribe(user => {
        console.log('当前用户请求成功', user);
        this.id = +user.id;
        const commonValidator = new CommonValidator(this.httpClient);
        this.formGroup.get('number')?.setAsyncValidators(commonValidator.numberUnique(this.id));
        this.formGroup.get('name')?.setValue(user.name);
        this.formGroup.get('sex')?.setValue(+user.sex);
        this.formGroup.get('role')?.setValue(+user.role);
        this.formGroup.get('number')?.setValue(user.number);
        this.password = user.password;
      }, error => {
        console.log('当前用户请求失败', error);
      });
  }

  checkPassword(): boolean {
    console.log('onSubmit h');
    // 通过原密码确认身份
    if (this.formGroup.get('password')?.value === this.password) {
      // 对新密码验证
      const newPassword = this.formGroup.get('newPassword')?.value;
      const newPasswordAgain = this.formGroup.get('newPasswordAgain')?.value;
      if (!newPassword) {
        this.commonService.error(() => {}, '请输入新密码');
        return false;
      }
      if (!newPasswordAgain) {
        this.commonService.error(() => {}, '请确认密码');
        return false;
      }
      console.log(!newPasswordAgain, newPasswordAgain);
      if (newPassword === newPasswordAgain) {
        return true;
      } else {
        this.commonService.error(() => {}, '两次输入的新密码不一致');
        return false;
      }
    } else {
      this.commonService.error(() => {}, '旧密码错误');
      return false;
    }
  }

  onSubmit(): void {
    console.log('onSubmit is called');
    const data = {
      id: this.id,
      name: this.formGroup.get('name')?.value,
      sex: this.formGroup.get('sex')?.value,
      number: this.formGroup.get('number')?.value,
      role: this.formGroup.get('role')?.value,
      password: this.formGroup.get('password')?.value,
    };
    if (!this.formGroup.get('password')?.value) {
      data.password = this.password;
    } else {
      if (this.checkPassword()) {
        data.password = this.formGroup.get('newPassword')?.value;
      } else {
        return ;
      }
    }
    Assert.isNumber(this.id, 'id的类型错误');
    this.userService.userUpdate(data)
      .subscribe(user => {
        console.log('用户更新成功', user);
        window.sessionStorage.removeItem('userNumber');
        window.sessionStorage.setItem('userNumber', user.number.toString());
        this.commonService.success(() => this.router.navigate(['./../'], {relativeTo: this.route}));
      }, error => {
        console.log('用户更新失败', error);
        this.commonService.error(() => {}, error);
      });
  }

}
