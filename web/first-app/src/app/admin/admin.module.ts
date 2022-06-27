import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TeacherAddComponent} from './teacher/teacher-add/teacher-add.component';
import {TeacherIndexComponent} from './teacher/teacher-index/teacher-index.component';
import {TeacherEditComponent} from './teacher/teacher-edit/teacher-edit.component';
import {TeacherUpdatePasswordComponent} from './teacher/teacher-update-password/teacher-update-password.component';
import {TermIndexComponent} from './term/index/term-index.component';
import {TermAddComponent} from './term/add/term-add.component';
import {TermEditComponent} from './term/edit/term-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {TermStatePipe} from './pipe/term-state.pipe';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {PageModule} from '../page/page.module';
import {RoomIndexComponent} from './room/room-index/room-index.component';
import {MockApiTestingModule} from '../mock-api/mock-api-testing.module';
import {AdminRoutingModule} from './admin-routing.module';
import {TeacherModule} from './teacher/teacher.module';
import {PipeModule} from '../pipe/pipe.module';

@NgModule({
  declarations: [
    TermIndexComponent,
    TermAddComponent,
    TermEditComponent,
  ],
  imports: [
    CommonModule,
    TeacherModule,
    AdminRoutingModule,
    HttpClientModule,
    PageModule,
    ReactiveFormsModule,
    MockApiTestingModule,
    PipeModule
  ],
  exports: [
  ],
  providers: [
  ]
})
export class AdminModule { }
