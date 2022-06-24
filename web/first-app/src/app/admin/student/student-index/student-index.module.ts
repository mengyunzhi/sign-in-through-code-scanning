import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StudentIndexComponent} from './student-index.component';
import {PageModule} from '../../../page/page.module';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [StudentIndexComponent],
  imports: [
    CommonModule,
    PageModule,
    RouterModule,
  ],
  exports: [
    StudentIndexComponent
  ]
})
export class StudentIndexModule { }
