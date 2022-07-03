import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TeacherIndexComponent} from './teacher-index/teacher-index.component';
import {TeacherAddComponent} from './teacher-add/teacher-add.component';
import {TeacherEditComponent} from './teacher-edit/teacher-edit.component';
import {TeacherUpdatePasswordComponent} from './teacher-update-password/teacher-update-password.component';


const routes: Routes = [
  {
    path: '',
    component: TeacherIndexComponent
  },
  {
    path: 'add',
    component: TeacherAddComponent
  },
  {
    path: 'edit/:id',
    component: TeacherEditComponent
  },
  {
    path: 'updatePassword/:id',
    component: TeacherUpdatePasswordComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule {
}
