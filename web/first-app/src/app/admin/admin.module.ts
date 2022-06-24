import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TeacherAddComponent} from './teacher/teacher-add/teacher-add.component';
import {TeacherIndexComponent} from './teacher/teacher-index/teacher-index.component';
import {TeacherEditComponent} from './teacher/teacher-edit/teacher-edit.component';
import {TeacherUpdatePasswordComponent} from './teacher/teacher-update-password/teacher-update-password.component';
import {TermIndexComponent} from './term/index/term-index.component';
import {TermAddComponent} from './term/add/term-add.component';
import {TermEditComponent} from './term/edit/term-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {TermStatePipe} from './pipe/term-state.pipe';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {MockApiInterceptor} from '@yunzhi/ng-mock-api';
import {TermMockApi} from '../mock-api/term.mock.api';
import {ClazzIndexComponent} from './clazz/clazz-index/clazz-index.component';
import {PageModule} from '../page/page.module';
import { RoomIndexComponent } from './room/room-index/room-index.component';
import { RoomAddComponent } from './room/room-add/room-add.component';
import { RoomEditComponent } from './room/room-edit/room-edit.component';
import {MockApiTestingModule} from '../mock-api/mock-api-testing.module';
import {TeacherIndexModule} from './teacher/teacher-index/teacher-index.module';

const routes: Routes = [
  {
    path: '',
    component: TermIndexComponent
  },
  {
    path: 'clazz',
    loadChildren: () => import('./clazz/clazz.module').then(m => m.ClazzModule),
  },
  {
    path: 'student',
    // 惰性加载
    loadChildren: () => import('./student/student.module').then(mod => mod.StudentModule)
  },
  {
    path: 'teacher',
    component: TeacherIndexComponent
  },
  {
    path: 'teacher/add',
    component: TeacherAddComponent
  },
  {
    path: 'teacher/edit',
    component: TeacherEditComponent
  },
  {
    path: 'teacher/updatePassword',
    component: TeacherUpdatePasswordComponent
  },
  {
    path: 'term',
    component: TermIndexComponent
  },
  {
    path: 'term/add',
    component: TermAddComponent
  },
  {
    path: 'term/edit/:id',
    component: TermEditComponent
  },
  {
    path: 'room',
    component: RoomIndexComponent
  },
  {
    path: 'room/add',
    component: RoomAddComponent
  },
  {
    path: 'room/Edit',
    component: RoomEditComponent
  },
];


@NgModule({
  declarations: [
    TermIndexComponent,
    TermAddComponent,
    TermEditComponent,
    TermStatePipe,
    RoomIndexComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    TeacherIndexModule,
    PageModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MockApiTestingModule
  ],
  exports: [
    TermStatePipe
  ],
  providers: [

  ]
})
export class AdminModule { }
