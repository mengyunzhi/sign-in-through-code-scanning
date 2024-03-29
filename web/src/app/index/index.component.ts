import {Component, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import {User} from '../entity/user';
import {MenuService} from '../service/menu.service';
import {Router} from '@angular/router';
import {UserService} from '../service/user.service';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  login: boolean | undefined;
  role = -1;
  constructor(private menuService: MenuService,
              private router: Router,
              private userService: UserService,
              private location: Location) {
  }

  ngOnInit(): void {
    // 获取缓存中的login，能获取到则设置login为true
    console.log('构造函数');
    // @ts-ignore
    const Login: string = window.sessionStorage.getItem('login');
    console.log('缓存的login', Login);
    if (Login === null) {
      this.login = false;
    }
    if (Login === 'true') {
      this.login = true;
    }
  }

  getModuleRole(): number {
    const module = this.location.path().split('/')[1];
    if (module === 'admin') {
      return UserService.ROLE_ADMIN;
    } else if (module === 'teacher') {
      return UserService.ROLE_TEACHER;
    } else if (module === 'student') {
      return UserService.ROLE_STUDENT;
    } else {
      // 访问 '/' 首页各个角色都一样
      return this.role as number;
    }
  }

  onLogin(user: User): void {
    // console.log(new Date().toTimeString(), '子组件进行了数据弹射', user);
    this.menuService.getAllowMenus();
    this.login = true;
    this.role = user.role;
    // 将登录状态写入缓存
    window.sessionStorage.setItem('login', 'true');
    window.sessionStorage.setItem('userNumber', user.number.toString());
    window.sessionStorage.setItem('role', user.role.toString());
  }

  onLogout(): void {
    console.log('接收到注销组件的数据弹射，开始注销');
    window.sessionStorage.removeItem('login');
    window.sessionStorage.removeItem('role');
    this.login = false;
  }
}
