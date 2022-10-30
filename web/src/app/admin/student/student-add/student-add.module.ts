import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StudentAddComponent} from './student-add.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ClazzModule} from '../../clazz/clazz.module';
import {ClazzShareModule} from '../../clazz/clazz-share.module';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [StudentAddComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClazzShareModule,
    RouterModule
  ],
  exports: [
    StudentAddComponent
  ]
})
export class StudentAddModule { }
