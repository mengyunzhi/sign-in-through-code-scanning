import {NgModule} from '@angular/core';
import {StudentAddComponent} from './student-add/student-add.component';
import {StudentEditComponent} from './student-edit/student-edit.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {StudentUpdatePasswordComponent} from './student-update-password/student-update-password.component';
import {PageModule} from '../../page/page.module';
import {MockApiTestingModule} from '../../mock-api/mock-api-testing.module';
import {StudentIndexModule} from './student-index/student-index.module';
import {StudentIndexComponent} from './student-index/student-index.component';
import {StudentRoutingModule} from './student-routing.module';

/**
 * 管理端-》学生模块
 */
@NgModule({
  declarations: [
    StudentAddComponent,
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
    StudentRoutingModule
  ]
})
export class StudentModule {
}
