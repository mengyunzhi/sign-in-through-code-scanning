import {Injectable} from '@angular/core';
import {Menu} from '../entity/menu';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { }

  getMenus(): Menu[] {
    return [
      {name: '学期管理', routerLink: '/admin/term', roles: [UserService.ROLE_ADMIN]} as Menu,
      {name: '教师管理', routerLink: '/admin/teacher', roles: [UserService.ROLE_ADMIN]} as Menu,
      {name: '班级管理', routerLink: '/admin/clazz', roles: [UserService.ROLE_ADMIN]} as Menu,
      {name: '学生管理', routerLink: '/admin/student', roles: [UserService.ROLE_ADMIN]} as Menu,
      {name: '教室管理', routerLink: '/admin/room', roles: [UserService.ROLE_ADMIN]} as Menu,
      {name: '个人中心', routerLink: '/admin/personal', roles: [UserService.ROLE_ADMIN]} as Menu,
      {name: '系统设置', routerLink: '/admin/site', roles: [UserService.ROLE_ADMIN]} as Menu,

      {name: '课程任务', routerLink: '/teacher/task', roles: [UserService.ROLE_TEACHER]} as Menu,
      {name: '排课管理', routerLink: '/teacher/schedule', roles: [UserService.ROLE_TEACHER]} as Menu,
      {name: '课程管理', routerLink: '/teacher/course', roles: [UserService.ROLE_TEACHER]} as Menu,
      {name: '课程表', routerLink: '/teacher/courseSchedule', roles: [UserService.ROLE_TEACHER]} as Menu,
      {name: '个人中心', routerLink: '/teacher/personal', roles: [UserService.ROLE_TEACHER]} as Menu,

      {name: '首页', routerLink: '/student/index', roles: [UserService.ROLE_STUDENT]} as Menu,
      {name: '个人中心', routerLink: '/student/personal', roles: [UserService.ROLE_STUDENT]} as Menu,
    ];
  }

  getAllowMenus(): Menu[] {
    const role = +(window.sessionStorage.getItem('role') as string);
    const menus = this.getMenus();
    return menus.filter(m => m.roles.includes(role));
  }
}
