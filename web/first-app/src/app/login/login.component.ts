import {Component, EventEmitter, NgZone, OnInit, Output} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../entity/user';
import {UserService} from '../service/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = {} as User;

  @Output()
  beLogin = new EventEmitter<User>();

  /**
   * 是否显示错误信息
   */
  showError = false;
  data: any;

  constructor(private httpClient: HttpClient,
              private ngZone: NgZone,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log('点击了登录按钮');

    this.userService.login(this.user.number, this.user.password)
      .subscribe(user => {
        console.log('登录成功', user);
        this.beLogin.emit(user);

        if (+user.role === UserService.ROLE_ADMIN) {
          this.router.navigateByUrl('/admin/term');
        } else if (+user.role === UserService.ROLE_TEACHER) {
          this.router.navigateByUrl('/teacher/task');
        } else if (+user.role === UserService.ROLE_STUDENT) {
          this.router.navigateByUrl('/student');
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
}
