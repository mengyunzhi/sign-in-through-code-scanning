import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TermScheduleModule} from './term-schedule/term-schedule.module';
import {WeekScheduleModule} from './week-schedule/week-schedule.module';
import {ClazzScheduleRoutingModule} from './clazz-schedule-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TermScheduleModule,
    WeekScheduleModule,
    ClazzScheduleRoutingModule
  ]
})
export class ClazzScheduleModule {
}
