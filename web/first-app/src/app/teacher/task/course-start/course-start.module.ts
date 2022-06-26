import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CourseStartComponent} from './course-start.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: CourseStartComponent
  }
];

@NgModule({
  declarations: [
    CourseStartComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    CourseStartComponent
  ]
})
export class CourseStartModule { }
