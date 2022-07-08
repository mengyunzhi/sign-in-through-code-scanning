import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StudentEditComponent} from './student-edit.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ClazzShareModule} from '../../clazz/clazz-share.module';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [StudentEditComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClazzShareModule,
    HttpClientModule,
    RouterModule
  ],
  exports: [
    StudentEditComponent
  ]
})
export class StudentEditModule {
}
