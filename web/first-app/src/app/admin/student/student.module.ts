import {NgModule} from '@angular/core';
import {StudentEditComponent} from './student-edit/student-edit.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StudentUpdatePasswordComponent} from './student-update-password/student-update-password.component';
import {PageModule} from '../../page/page.module';
import {MockApiTestingModule} from '../../mock-api/mock-api-testing.module';
import {StudentIndexModule} from './student-index/student-index.module';
import {StudentRoutingModule} from './student-routing.module';
import {StudentAddModule} from './student-add/student-add.module';
import {StudentEditModule} from './student-edit/student-edit.module';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {ApiInterceptor} from '../../interceptor/api.interceptor';

/**
 * 管理端-》学生模块
 */
@NgModule({
  declarations: [
    StudentUpdatePasswordComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PageModule,
    FormsModule,
    StudentIndexModule,
    StudentAddModule,
    StudentRoutingModule,
    StudentEditModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, multi: true,
      useClass: ApiInterceptor
    }
  ]
})
export class StudentModule {
}
