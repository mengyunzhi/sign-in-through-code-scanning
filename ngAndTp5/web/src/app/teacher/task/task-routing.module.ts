import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignInStateComponent} from './sign-in-state/sign-in-state.component';
import {TaskIndexComponent} from './task-index/task-index.component';
import {ViewStudentComponent} from './view-student/view-student.component';
import {ViewStudentAddComponent} from './view-student-add/view-student-add.component';
import {ViewStudentFractionComponent} from './view-student-fraction/view-student-fraction.component';
import {CourseStartComponent} from './course-start/course-start.component';

const routes: Routes = [
  {
    path: '',
    component: TaskIndexComponent,
  },
  {
    path: 'viewStudent/:schedule_id',
    component: ViewStudentComponent
  },
  {
    path: 'viewStudent/:schedule_id/add',
    component: ViewStudentAddComponent,
  },
  {
    path: 'viewStudent/:schedule_id/fraction/:student_id',
    component: ViewStudentFractionComponent,
  },
  {
    path: 'courseStart/:schedule_id',
    component: CourseStartComponent,
  },
  {
    path: 'courseStart/:schedule_id/signInState',
    component: SignInStateComponent,
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
