import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StudentIndexComponent} from './student-index.component';
import {PageModule} from '../../../page/page.module';
import {RouterModule} from '@angular/router';
import {PipeModule} from '../../../pipe/pipe.module';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [StudentIndexComponent],
  imports: [
    CommonModule,
    PageModule,
    RouterModule,
    PipeModule,
    ReactiveFormsModule,
  ],
  exports: [
    StudentIndexComponent
  ]
})
export class StudentIndexModule { }
