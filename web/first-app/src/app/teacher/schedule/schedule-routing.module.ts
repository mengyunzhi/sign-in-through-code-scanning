import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ScheduleIndexComponent} from './schedule-index/schedule-index.component';

const routes: Routes = [
  {
    path: '',
    component: ScheduleIndexComponent
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
