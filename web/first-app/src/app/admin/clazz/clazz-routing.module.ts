import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClazzIndexComponent} from './clazz-index/clazz-index.component';
import {ClazzAddComponent} from './clazz-add/clazz-add.component';
import {ClazzMembersComponent} from './clazz-members/clazz-members.component';
import {ClazzMembersAddComponent} from './clazz-members-add/clazz-members-add.component';
import {ClazzEditComponent} from './clazz-edit/clazz-edit.component';
import {ClazzMembersEditComponent} from './clazz-mebers-edit/clazz-mebers-edit.component';

const routes: Routes = [
  {
    path: '',
    component: ClazzIndexComponent
  },
  {
    path: 'add',
    component: ClazzAddComponent
  },
  {
    path: 'clazzMembers/:clazz_id',
    component: ClazzMembersComponent
  },
  {
    path: 'clazzMembers/:clazz_id/add',
    component: ClazzMembersAddComponent
  },
  {
    path: 'edit/:clazz_id',
    component: ClazzEditComponent
  },
  {
    path: 'clazzMembers/:clazz_id/edit/:student_id',
    component: ClazzMembersEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClazzRoutingModule { }
