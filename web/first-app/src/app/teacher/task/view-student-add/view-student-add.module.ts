import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ViewStudentAddComponent} from './view-student-add.component';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    ViewStudentAddComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  exports: [
    ViewStudentAddComponent
  ]
})
export class ViewStudentAddModule { }
