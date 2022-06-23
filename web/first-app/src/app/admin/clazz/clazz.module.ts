import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClazzIndexComponent} from './clazz-index/clazz-index.component';
import {RouterModule, Routes} from '@angular/router';
import { ClazzMembersComponent } from './clazz-members/clazz-members.component';
import { ClazzAddComponent } from './clazz-add/clazz-add.component';
import { ClazzEditComponent } from './clazz-edit/clazz-edit.component';
import { ClazzMembersAddComponent } from './clazz-members-add/clazz-members-add.component';
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
    path: 'clazzMembers/:clazzId',
    component: ClazzMembersComponent
  },
  {
    path: 'clazzMembers/:clazzId/add',
    component: ClazzMembersAddComponent
  },
  {
    path: 'edit/:clazzId',
    component: ClazzEditComponent
  },
  {
    path: 'clazzMembers/:clazzId/edit/:studentId',
    component: ClazzMembersEditComponent
  }

]

@NgModule({
  declarations: [ClazzIndexComponent, ClazzMembersComponent, ClazzAddComponent, ClazzEditComponent, ClazzMembersAddComponent, ClazzMembersEditComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ClazzModule { }
