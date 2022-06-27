import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TeacherIndexComponent} from './teacher-index.component';
import {RouterModule} from '@angular/router';
import {PageModule} from '../../../page/page.module';


@NgModule({
  declarations: [TeacherIndexComponent],
  imports: [
    CommonModule,
    RouterModule,
    PageModule
  ],
  exports: [TeacherIndexComponent]
})
export class TeacherIndexModule { }
