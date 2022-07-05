import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StudentEditComponent} from './student-edit.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ClazzShareModule} from '../../clazz/clazz-share.module';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [StudentEditComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClazzShareModule,
    HttpClientModule
  ],
  exports: [
    StudentEditComponent
  ]
})
export class StudentEditModule {
}
