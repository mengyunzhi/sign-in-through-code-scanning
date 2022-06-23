import {NgModule} from '@angular/core';
import {StudentAddComponent} from './student-add/student-add.component';
import {StudentEditComponent} from './student-edit/student-edit.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {StudentIndexComponent} from './student-index/student-index.component';
import {StudentUpdatePasswordComponent} from './student-update-password/student-update-password.component';
import {PageModule} from '../../page/page.module';

/*定义路由*/
const routes: Routes = [
  {
    path: '',
    component: StudentIndexComponent
  }, {
    path: 'add',
    component: StudentAddComponent
  }, {
    path: 'edit',
    component: StudentEditComponent
  }, {
    path: 'updatePassword',
    component: StudentUpdatePasswordComponent
  }
];

/**
 * 管理端-》学生模块
 */
@NgModule({
  declarations: [
    StudentIndexComponent,
    StudentAddComponent,
    StudentEditComponent,
    StudentUpdatePasswordComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    PageModule,
    FormsModule
  ]
})
export class StudentModule {
}
