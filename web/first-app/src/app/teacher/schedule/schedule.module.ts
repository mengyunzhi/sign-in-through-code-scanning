import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ScheduleRoutingModule} from './schedule-routing.module';
import { ProgramAddComponent } from './schedule-edit/program-add/program-add.component';
import { ClazzAddComponent } from './schedule-edit/clazz-add/clazz-add.component';
import { TimeAddComponent } from './schedule-edit/time-add/time-add.component';
import { ProgramEditComponent } from './schedule-edit/program-edit/program-edit.component';
import { NameEditComponent } from './schedule-edit/name-edit/name-edit.component';
import { ScheduleAddComponent } from './schedule-add/schedule-add.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ScheduleEditComponent} from './schedule-edit/schedule-edit.component';



@NgModule({
  declarations: [
    ProgramAddComponent,
    ClazzAddComponent,
    TimeAddComponent,
    ProgramEditComponent,
    NameEditComponent,
    ScheduleAddComponent,
    ScheduleEditComponent
  ],
  imports: [
    CommonModule,
    ScheduleRoutingModule,
    ReactiveFormsModule
  ]
})
export class ScheduleModule { }
