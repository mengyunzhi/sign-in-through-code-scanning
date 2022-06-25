import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StudentIndexComponent} from './student-index/student-index.component';
import {StudentAddComponent} from './student-add/student-add.component';
import {StudentEditComponent} from './student-edit/student-edit.component';
import {StudentUpdatePasswordComponent} from './student-update-password/student-update-password.component';

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

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
