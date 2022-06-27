import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TaskRoutingModule} from './task-routing.module';
import { ViewStudentFractionComponent } from './view-student-fraction/view-student-fraction.component';



@NgModule({
  imports: [
    CommonModule,
    TaskRoutingModule
  ]
})
export class TaskModule { }
