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
  data: any;

  constructor(private httpClient: HttpClient,
              private ngZone: NgZone) {
  }

  ngOnInit(): void {
    this.httpClient.get('http://localhost:8080/api/angular/api/public/index/login/test')
      .subscribe(data => {
        console.log('api数据', data);
        console.log(Number(Math.random() * 10000).toFixed(0));
        this.data = data;
      }, error => console.log(error));
  }

  onSubmit(): void {
    console.log('点击了登录按钮');
    if (this.user.number === '000' && this.user.password === '000') {
      this.user.role = 0;
      this.beLogin.emit(this.user);
    } else if (this.user.number === '111' && this.user.password === '111') {
      this.user.role = 1;
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
