import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WeekScheduleComponent} from './week-schedule.component';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [WeekScheduleComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [WeekScheduleComponent]
})
export class WeekScheduleModule {
}
