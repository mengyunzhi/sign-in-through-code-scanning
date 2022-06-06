import {NgModule} from '@angular/core';
import {StudentIndexComponent} from './index/student-index.component';
import { StudentAddComponent } from './student-add/student-add.component';
import { StudentEditComponent } from './student-edit/student-edit.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

/*定义路由*/
const routes: Routes = [
  {
    path: '',
    component: StudentIndexComponent
  }, {
    path: 'add',
    component: StudentAddComponent
  }, {
    path: 'edit/:id',
    component: StudentEditComponent
  }
];

/**
 * 管理端-》学生模块
 */
@NgModule({
  declarations: [
    StudentIndexComponent,
    StudentAddComponent,
    StudentEditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ]
})
export class StudentModule {
}
