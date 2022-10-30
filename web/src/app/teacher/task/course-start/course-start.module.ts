import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CourseStartComponent} from './course-start.component';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [
    CourseStartComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    CourseStartComponent
  ]
})
export class CourseStartModule { }
