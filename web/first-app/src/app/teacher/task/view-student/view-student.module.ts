import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ViewStudentComponent} from './view-student.component';
import {PipeModule} from '../../../pipe/pipe.module';
import {PageModule} from '../../../page/page.module';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [
    ViewStudentComponent
  ],
  imports: [
    CommonModule,
    PipeModule,
    PageModule,
    RouterModule
  ],
  exports: [
    ViewStudentComponent
  ]
})
export class ViewStudentModule { }
