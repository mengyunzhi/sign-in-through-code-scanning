import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WelcomeComponent} from '../welcome/welcome.component';


const routes: Routes = [
  {
    path: 'task',
    loadChildren: () => import('./task/task.module').then(m => m.TaskModule),
  },
  {
    path: '',
    loadChildren: () => import('./task/task.module').then(m => m.TaskModule),
  },
  {
    path: 'personal',
    loadChildren: () => import('./../admin/personal/personal.module').then(m => m.PersonalModule)
  },
  {
    path: 'course',
    loadChildren: () => import('./course/course.module').then(m => m.CourseModule),
  },
  {
    path: 'schedule',
    loadChildren: () => import('./schedule/schedule.module').then(m => m.ScheduleModule),
  },
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: 'courseSchedule',
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
