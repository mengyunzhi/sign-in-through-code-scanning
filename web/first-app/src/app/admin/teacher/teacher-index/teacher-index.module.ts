import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TeacherIndexComponent} from './teacher-index.component';
import {RouterModule} from '@angular/router';
import {PageModule} from '../../../page/page.module';
import {PipeModule} from '../../../pipe/pipe.module';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [TeacherIndexComponent],
  imports: [
    CommonModule,
    RouterModule,
    PageModule,
    PipeModule,
    ReactiveFormsModule
  ],
  exports: [TeacherIndexComponent]
})
export class TeacherIndexModule { }
