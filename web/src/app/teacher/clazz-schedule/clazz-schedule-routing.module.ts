import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WeekScheduleComponent} from './week-schedule/week-schedule.component';
import {TermScheduleComponent} from './term-schedule/term-schedule.component';

/*定义路由*/
const routes: Routes = [
  {
    path: '',
    component: WeekScheduleComponent
  }, {
    path: 'week',
    component: WeekScheduleComponent
  }, {
    path: 'term',
    component: TermScheduleComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClazzScheduleRoutingModule { }
