import {Component, EventEmitter, NgZone, OnInit, Output} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../entity/user';
import {UserService} from '../service/user.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CommonService} from '../service/common.service';
import {CommonValidator} from '../validator/common-validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = {} as User;

  registerGroup = new FormGroup({
    sno: new FormControl('',
      Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20), CommonValidator.sno])),
    password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(40)])),
    number: new FormControl('', Validators.required)
  });

  @Output()
  beLogin = new EventEmitter<User>();

  isRegister = false;

  /**
   * 是否显示错误信息
   */
  showError = false;
  data: any;

  constructor(private httpClient: HttpClient,
              private ngZone: NgZone,
              private userService: UserService,
              private router: Router,
              private commonService: CommonService) {
  }

  ngOnInit(): void {
  }

  changeRegister(): void {
    this.isRegister = !this.isRegister;
  }

  onSubmit(): void {
    console.log('点击了登录按钮');

    this.userService.login(this.user.number, this.user.password)
      .subscribe(user => {
        console.log('登录成功', user);
        this.beLogin.emit(user);

        if (+user.role === UserService.ROLE_ADMIN) {
          this.router.navigateByUrl('/admin/term').then();
        } else if (+user.role === UserService.ROLE_TEACHER) {
          this.router.navigateByUrl('/teacher/task').then();
        } else if (+user.role === UserService.ROLE_STUDENT) {
          this.router.navigateByUrl('/student').then();
        }

      }, error => {
        console.log('登录失败', error);
        this.showErrorDelay();
      });
  }

  /**
   * 延迟显示错误信息
   */
  showErrorDelay(): void {
    this.showError = true;
    this.ngZone.run(() => {
      setTimeout(() => {
        console.log('1.5秒后触发');
        this.showError = false;
      }, 1500);
    });
  }

  studentRegister(): void {
    this.userService.studentRegister(this.registerGroup.value)
      .subscribe(success => {
        console.log('注册成功', success);
        this.commonService.success(() => this.changeRegister());
      }, error => {
        console.log('注册失败', error);
        this.commonService.error();
      });
  }
}
