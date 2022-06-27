import {Injectable} from '@angular/core';
import {Menu} from '../entity/menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { }

  getMenus(): Menu[] {
    return [
      {name: '学期管理', routerLink: '/admin/term', roles: [0]} as Menu,
      {name: '教师管理', routerLink: '/admin/teacher', roles: [0]} as Menu,
      {name: '学生管理', routerLink: '/admin/student', roles: [0]} as Menu,
      {name: '班级管理', routerLink: '/admin/clazz', roles: [0]} as Menu,
      {name: '教室管理', routerLink: '/admin/room', roles: [0]} as Menu,
      {name: '个人中心', routerLink: '/admin/personal', roles: [0]} as Menu,

      {name: '课程任务', routerLink: '/teacher/task', roles: [1]} as Menu,
      {name: '排课管理', routerLink: '/teacher/schedule', roles: [1]} as Menu,
      {name: '课程管理', routerLink: '/teacher/course', roles: [1]} as Menu,
      {name: '课程表', routerLink: '/teacher/courseSchedule', roles: [1]} as Menu,
      {name: '个人中心', routerLink: '/teacher/personal', roles: [1]} as Menu,
    ];
  }

  getAllowMenus(): Menu[] {
    const role = +(window.sessionStorage.getItem('role') as string);
    const menus = this.getMenus();
    return menus.filter(m => m.roles.includes(role));
  }
}
