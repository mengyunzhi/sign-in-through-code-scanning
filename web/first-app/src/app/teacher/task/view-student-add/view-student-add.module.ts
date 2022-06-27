import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ViewStudentAddComponent} from './view-student-add.component';
import {Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ViewStudentAddComponent
  }
];

@NgModule({
  declarations: [
    ViewStudentAddComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ViewStudentAddModule { }
