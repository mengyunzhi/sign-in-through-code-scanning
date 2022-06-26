import {Component, OnInit} from '@angular/core';
import {User} from '../entity/user';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  login = false;
  role: number | null = null;
  constructor() {
  }

  ngOnInit(): void {
    // 获取缓存中的login，能获取到则设置login为true
    if (window.sessionStorage.getItem('login') !== null) {
      this.login = true;
    }
    if (window.sessionStorage.getItem('role') !== null) {
      const a = window.sessionStorage.getItem('role') as string;
      this.role = +a;
    }
  }

  onLogin(user: User): void {
    console.log(new Date().toTimeString(), '子组件进行了数据弹射', user);
    this.login = true;
    this.role = user.role;
    // 将登录状态写入缓存
    window.sessionStorage.setItem('login', 'true');
    window.sessionStorage.setItem('role', user.role.toString());
  }

  onLogout(): void {
    console.log('接收到注销组件的数据弹射，开始注销');
    this.login = false;
    this.role = null;
    window.sessionStorage.removeItem('login');
    window.sessionStorage.removeItem('role');
  }
}
