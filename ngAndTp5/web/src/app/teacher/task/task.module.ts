import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TaskRoutingModule} from './task-routing.module';
import {CourseStartModule} from './course-start/course-start.module';
import {SignInStateModule} from './sign-in-state/sign-in-state.module';
import {TaskIndexModule} from './task-index/task-index.module';
import {ViewStudentModule} from './view-student/view-student.module';
import {ViewStudentAddModule} from './view-student-add/view-student-add.module';
import {ViewStudentFractionModule} from './view-student-fraction/view-student-fraction.module';
import {PipeModule} from '../../pipe/pipe.module';

@NgModule({
  imports: [
    CommonModule,
    TaskRoutingModule,
    CourseStartModule,
    SignInStateModule,
    TaskIndexModule,
    ViewStudentModule,
    ViewStudentAddModule,
    ViewStudentFractionModule,
    PipeModule
  ],
})
export class TaskModule { }
