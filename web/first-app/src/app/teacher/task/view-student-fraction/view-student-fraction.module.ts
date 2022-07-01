import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ViewStudentFractionComponent} from './view-student-fraction.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [ViewStudentFractionComponent],
  imports: [
    CommonModule,
    RouterModule,
  ]
})
export class ViewStudentFractionModule { }
