import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./task-index/task-index.module').then(m => m.TaskIndexModule)
  },
  {
    path: 'viewStudent/:schedule_id',
    loadChildren: () => import('./view-student/view-student.module').then(m => m.ViewStudentModule),
  },
  {
    path: 'courseStart/:schedule_id',
    loadChildren: () => import('./course-start/course-start.module').then(m => m.CourseStartModule),
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
