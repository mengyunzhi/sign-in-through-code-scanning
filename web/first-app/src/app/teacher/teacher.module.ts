import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MockApiTestingModule} from '../mock-api/mock-api-testing.module';
import {PageModule} from '../page/page.module';
import {PipeModule} from '../pipe/pipe.module';
import {TeacherRoutingModule} from './teacher-routing.module';
import {CourseModule} from './course/course.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MockApiTestingModule,
    PageModule,
    PipeModule,
    TeacherRoutingModule,
    CourseModule
  ],
  providers: [
  ]
})
export class TeacherModule { }
