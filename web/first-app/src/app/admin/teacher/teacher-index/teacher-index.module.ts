import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TeacherIndexComponent} from './teacher-index.component';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [TeacherIndexComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [TeacherIndexComponent]
})
export class TeacherIndexModule { }
