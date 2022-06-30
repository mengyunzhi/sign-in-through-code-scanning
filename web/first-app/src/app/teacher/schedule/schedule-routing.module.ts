import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ScheduleIndexComponent} from './schedule-index/schedule-index.component';
import {ScheduleEditComponent} from './schedule-edit/schedule-edit.component';
import {ProgramAddComponent} from './schedule-edit/program-add/program-add.component';
import {ClazzAddComponent} from './schedule-edit/clazz-add/clazz-add.component';
import {TimeAddComponent} from './schedule-edit/time-add/time-add.component';

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
