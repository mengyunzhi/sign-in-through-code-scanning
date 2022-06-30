import {Component, EventEmitter, NgZone, OnInit, Output} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../entity/user';

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

  constructor(private httpClient: HttpClient, private ngZone: NgZone) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log('点击了登录按钮');
    if (this.user.number === '000' && this.user.password === '000') {
      this.user.role = 0;
      this.beLogin.emit(this.user);
    } else if (this.user.number === '111' && this.user.password === '111') {
      this.user.role = 1;
      this.beLogin.emit(this.user);
    } else if (this.user.number === '222' && this.user.password === '222') {
      this.user.role = 2;
      this.beLogin.emit(this.user);
    } else {
      this.showErrorDelay();
    }
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
