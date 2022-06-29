import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MockApiTestingModule} from '../mock-api/mock-api-testing.module';
import {PageModule} from '../page/page.module';
import {PipeModule} from '../pipe/pipe.module';
import {TeacherRoutingModule} from './teacher-routing.module';
import {CourseModule} from './course/course.module';
import {ClazzScheduleModule} from './clazz-schedule/clazz-schedule.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MockApiTestingModule,
    PageModule,
    PipeModule,
    TeacherRoutingModule,
    CourseModule,
    ClazzScheduleModule
  ],
  providers: [
  ]
})
export class TeacherModule { }
