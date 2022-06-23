import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClazzIndexComponent} from './clazz-index/clazz-index.component';
import {RouterModule, Routes} from '@angular/router';
import { ClazzMembersComponent } from './clazz-members/clazz-members.component';

const routes: Routes = [
  {
    path: '',
    component: ClazzIndexComponent
  },
  {
    path: 'clazzMembers/:clazzId',
    component: ClazzMembersComponent
  }
]

@NgModule({
  declarations: [ClazzIndexComponent, ClazzMembersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ClazzModule { }
