import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SiteIndexComponent} from './site-index/site-index.component';
import {
  UpdateStudentIndexPasswordComponent
} from './update-student-index-password/update-student-index-password.component';
import {
  UpdateTeacherIndexPasswordComponent
} from './update-teacher-index-password/update-teacher-index-password.component';

const routes: Routes = [
  {
    path: '',
    component: SiteIndexComponent
  },
  {
    path: 'updateTeacherPassword',
    component: UpdateTeacherIndexPasswordComponent
  },
  {
    path: 'updateStudentPassword',
    component: UpdateStudentIndexPasswordComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SiteRoutingModule { }
