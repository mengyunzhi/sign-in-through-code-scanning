import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ViewStudentFractionComponent} from './view-student-fraction.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ViewStudentFractionComponent
  }
];

@NgModule({
  declarations: [ViewStudentFractionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ViewStudentFractionModule { }
