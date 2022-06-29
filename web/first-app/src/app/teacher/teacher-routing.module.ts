import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {WelcomeComponent} from '../welcome/welcome.component';


const routes: Routes = [
  {
    path: 'task',
    loadChildren: () => import('./task/task.module').then(m => m.TaskModule),
  },
  {
    path: 'course',
    loadChildren: () => import('./course/course.module').then(m => m.CourseModule),
  },
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: 'clazz-schedule',
    loadChildren: () => import('./clazz-schedule/clazz-schedule.module').then(m => m.ClazzScheduleModule),
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class TeacherRoutingModule { }