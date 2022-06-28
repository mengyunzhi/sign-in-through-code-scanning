import {NgModule} from '@angular/core';
import {StudentAddComponent} from './student-add/student-add.component';
import {StudentEditComponent} from './student-edit/student-edit.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StudentUpdatePasswordComponent} from './student-update-password/student-update-password.component';
import {PageModule} from '../../page/page.module';
import {MockApiTestingModule} from '../../mock-api/mock-api-testing.module';
import {StudentIndexModule} from './student-index/student-index.module';
import {StudentRoutingModule} from './student-routing.module';
import {StudentAddModule} from './student-add/student-add.module';

/**
 * 管理端-》学生模块
 */
@NgModule({
  declarations: [
    StudentEditComponent,
    StudentUpdatePasswordComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PageModule,
    FormsModule,
    MockApiTestingModule,
    StudentIndexModule,
    StudentAddModule,
    StudentRoutingModule,
  ]
})
export class StudentModule {
}
