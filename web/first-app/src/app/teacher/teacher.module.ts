import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MockApiTestingModule} from '../mock-api/mock-api-testing.module';
import {PageModule} from '../page/page.module';
import {PipeModule} from '../pipe/pipe.module';
import {TeacherRoutingModule} from './teacher-routing.module';
import {CourseModule} from './course/course.module';
import {ClazzScheduleModule} from './clazz-schedule/clazz-schedule.module';
import { ScheduleIndexComponent } from './schedule/schedule-index/schedule-index.component';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [ScheduleIndexComponent],
  imports: [
    CommonModule,
    PageModule,
    PipeModule,
    TeacherRoutingModule,
    CourseModule,
    ClazzScheduleModule,
    RouterModule,
    ReactiveFormsModule,
  ]
})
export class TeacherModule { }
