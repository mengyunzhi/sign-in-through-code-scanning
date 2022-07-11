import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ScheduleEditComponent} from './schedule-edit.component';



@NgModule({
  declarations: [ScheduleEditComponent],
  imports: [
    CommonModule
  ],
  exports: [
    ScheduleEditComponent
  ]
})
export class ScheduleEditModule { }
