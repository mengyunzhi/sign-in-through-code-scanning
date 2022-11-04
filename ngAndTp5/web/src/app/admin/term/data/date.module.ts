import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DateComponent} from './date.component';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [DateComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [DateComponent]
})
export class DateModule { }
