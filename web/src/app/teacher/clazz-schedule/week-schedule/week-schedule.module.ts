import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WeekScheduleComponent} from './week-schedule.component';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [WeekScheduleComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [WeekScheduleComponent]
})
export class WeekScheduleModule {
}
