import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {StudentIndexComponent} from './admin/student/index/student-index.component';
import { TermIndexComponent } from './admin/term/index/term-index.component';
import { TermAddComponent } from './admin/term/add/term-add.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MockApiInterceptor} from '@yunzhi/ng-mock-api';
import {TermMockApi} from './mock-api/term.mock.api';
import { TermEditComponent } from './admin/term/edit/term-edit.component';
import { TermStatePipe } from './admin/pipe/term-state.pipe';
import {TeacherIndexComponent} from './admin/teacher/teacher-index/teacher-index.component';
import {TeacherEditComponent} from './admin/teacher/teacher-edit/teacher-edit.component';
import {TeacherAddComponent} from './admin/teacher/teacher-add/teacher-add.component';
import {TeacherUpdatePasswordComponent} from './admin/teacher/teacher-update-password/teacher-update-password.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TermIndexComponent,
    TermAddComponent,
    TermEditComponent,
    TermStatePipe,
    TeacherIndexComponent,
    TeacherEditComponent,
    TeacherAddComponent,
    TeacherUpdatePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
