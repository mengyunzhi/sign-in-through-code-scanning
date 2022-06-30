import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WelcomeComponent} from '../welcome/welcome.component';
import {ViewStudentComponent} from './task/view-student/view-student.component';


const routes: Routes = [
  {
    path: 'task',
    loadChildren: () => import('./task/task.module').then(m => m.TaskModule),
  },
  {
    path: 'personal',
    component: ViewStudentComponent
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
