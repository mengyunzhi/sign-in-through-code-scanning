import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ScheduleIndexComponent} from './schedule-index/schedule-index.component';
import {ScheduleEditComponent} from './schedule-edit/schedule-edit.component';
import {ProgramAddComponent} from './schedule-edit/program-add/program-add.component';
import {ClazzAddComponent} from './schedule-edit/clazz-add/clazz-add.component';
import {TimeAddComponent} from './schedule-edit/time-add/time-add.component';
import {ProgramEditComponent} from './schedule-edit/program-edit/program-edit.component';
import {NameEditComponent} from './schedule-edit/name-edit/name-edit.component';
import {ScheduleAddComponent} from './schedule-add/schedule-add.component';

const routes: Routes = [
  {
    path: '',
    component: ScheduleIndexComponent
  },
  {
    path: 'edit',
    component: ScheduleEditComponent
  },
  {
    path: 'edit/programAdd',
    component: ProgramAddComponent
  },
  {
    path: 'edit/clazzAdd',
    component: ClazzAddComponent
  },
  {
    path: 'edit/timeAdd',
    component: TimeAddComponent
  },
  {
    path: 'edit/programEdit',
    component: ProgramEditComponent
  },
  {
    path: 'edit/nameEdit',
    component: NameEditComponent
  },
  {
    path: 'add',
    component: ScheduleAddComponent
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class ScheduleRoutingModule { }
