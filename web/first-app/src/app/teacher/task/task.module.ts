import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TaskRoutingModule} from './task-routing.module';
import {CourseStartModule} from './course-start/course-start.module';
import {SignInStateComponent} from './sign-in-state/sign-in-state.component';
import {TaskIndexModule} from './task-index/task-index.module';
import {ViewStudentModule} from './view-student/view-student.module';
import {ViewStudentAddModule} from './view-student-add/view-student-add.module';
import {ViewStudentFractionModule} from './view-student-fraction/view-student-fraction.module';
import {SignInStateModule} from './sign-in-state/sign-in-state.module';



@NgModule({
  imports: [
    CommonModule,
    TaskRoutingModule,
  ],
})
export class TaskModule { }
