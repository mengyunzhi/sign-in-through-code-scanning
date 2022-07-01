import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ViewStudentAddComponent} from './view-student-add.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    ViewStudentAddComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ]
})
export class ViewStudentAddModule { }
