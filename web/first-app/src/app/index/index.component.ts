import {Component, OnInit} from '@angular/core';
import {User} from '../entity/user';
import {MenuService} from '../service/menu.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  login = false;
  role: number | null = null;
  constructor(private menuService: MenuService,
              private router: Router) {
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
    this.menuService.getAllowMenus();
    this.login = true;
    this.role = user.role;
    // 将登录状态写入缓存
    window.sessionStorage.setItem('login', 'true');
    window.sessionStorage.setItem('role', user.role.toString());
    if (user.role === 0) {
      this.router.navigateByUrl('/admin');
    } else if (user.role === 1) {
      this.router.navigateByUrl('/teacher');
    } else if (user.role === 2) {
      this.router.navigateByUrl('/student');
    }
  }

  onLogout(): void {
    console.log('接收到注销组件的数据弹射，开始注销');
    this.login = false;
    this.role = null;
    window.sessionStorage.removeItem('login');
    window.sessionStorage.removeItem('role');
    this.router.navigateByUrl('/');
  }
}
