import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {CourseIndexComponent} from './course-index/course-index.component';
import {CourseAddComponent} from './course-add/course-add.component';
import {CourseEditComponent} from './course-edit/course-edit.component';

const routes: Routes = [
  {
    path: '',
    component: CourseIndexComponent
  },
  {
    path: 'add',
    component: CourseAddComponent
  },
  {
    path: 'edit/:id',
    component: CourseEditComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class CourseRoutingModule { }
