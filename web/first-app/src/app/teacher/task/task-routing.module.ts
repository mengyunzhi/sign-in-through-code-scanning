import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageModule} from '../../page/page.module';
import {SignInStateComponent} from './sign-in-state/sign-in-state.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./task-index/task-index.module').then(m => m.TaskIndexModule),
  },
  {
    path: 'viewStudent/:schedule_id',
    loadChildren: () => import('./view-student/view-student.module').then(m => m.ViewStudentModule),
  },
  {
    path: 'viewStudent/:schedule_id/add',
    loadChildren: () => import('./view-student-add/view-student-add.module').then(m => m.ViewStudentAddModule)
  },
  {
    path: 'viewStudent/:schedule_id/fraction/:student_id',
    loadChildren: () => import('./view-student-fraction/view-student-fraction.module').then(m => m.ViewStudentFractionModule)
  },
  {
    path: 'courseStart/:schedule_id',
    loadChildren: () => import('./course-start/course-start.module').then(m => m.CourseStartModule),
  },
  {
    path: 'courseStart/:schedule_id/signInState',
    loadChildren: () => import('./sign-in-state/sign-in-state.module').then(m => m.SignInStateModule),
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class TaskRoutingModule { }