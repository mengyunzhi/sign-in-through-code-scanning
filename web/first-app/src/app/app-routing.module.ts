import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TermIndexComponent} from './admin/term/index/term-index.component';
import {TeacherIndexComponent} from './admin/teacher/teacher-index/teacher-index.component';
import {TeacherAddComponent} from './admin/teacher/teacher-add/teacher-add.component';
import {TeacherEditComponent} from './admin/teacher/teacher-edit/teacher-edit.component';
import {TeacherUpdatePasswordComponent} from './admin/teacher/teacher-update-password/teacher-update-password.component';
import {TermAddComponent} from './admin/term/add/term-add.component';
import {TermEditComponent} from './admin/term/edit/term-edit.component';

const routes: Routes = [
  {
    path: 'admin',
    component: TermIndexComponent
  },
  {
    path: 'admin/teacher',
    component: TeacherIndexComponent
  },
  {
    path: 'admin/teacher/add',
    component: TeacherAddComponent
  },
  {
    path: 'admin/teacher/edit',
    component: TeacherEditComponent
  },
  {
    path: 'admin/teacher/updatePassword',
    component: TeacherUpdatePasswordComponent
  },
  {
    path: 'admin/term',
    component: TermIndexComponent
  },
  {
    path: 'admin/term/add',
    component: TermAddComponent
  },
  {
    path: 'admin/term/edit/:id',
    component: TermEditComponent
  },
  {
    path: 'admin/student',
    // 惰性加载
    loadChildren: () => import('./admin/student/student.module').then(mod => mod.StudentModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
