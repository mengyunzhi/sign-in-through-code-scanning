import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StudentAddComponent} from './student-add.component';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [StudentAddComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    StudentAddComponent
  ]
})
export class StudentAddModule { }
