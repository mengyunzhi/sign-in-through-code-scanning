import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CourseRoutingModule} from './course-routing.module';
import { CourseAddComponent } from './course-add/course-add.component';
import { CourseEditComponent } from './course-edit/course-edit.component';



@NgModule({
  declarations: [CourseAddComponent, CourseEditComponent],
  imports: [
    CommonModule,
    CourseRoutingModule,
  ],
})
export class CourseModule { }
