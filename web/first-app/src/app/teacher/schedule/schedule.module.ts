import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ScheduleRoutingModule} from './schedule-routing.module';
import { ScheduleEditComponent } from './schedule-edit/schedule-edit.component';
import { ProgramAddComponent } from './schedule-edit/program-add/program-add.component';
import { ClazzAddComponent } from './schedule-edit/clazz-add/clazz-add.component';
import { TimeAddComponent } from './schedule-edit/time-add/time-add.component';



@NgModule({
  declarations: [ScheduleEditComponent, ProgramAddComponent, ClazzAddComponent, TimeAddComponent],
  imports: [
    CommonModule,
    ScheduleRoutingModule
  ]
})
export class ScheduleModule { }
