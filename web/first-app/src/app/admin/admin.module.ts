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

const routes: Routes = [
  {
    path: '',
    component: TermIndexComponent
  },
  {
    path: 'clazz',
    component: ClazzIndexComponent,
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
];


@NgModule({
  declarations: [
    TeacherIndexComponent, TeacherAddComponent, TeacherEditComponent, TeacherUpdatePasswordComponent,
    TermIndexComponent, TermAddComponent, TermEditComponent, TermStatePipe, ClazzIndexComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    PageModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),

  ],
  exports: [
    TermStatePipe
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, multi: true,
      useClass: MockApiInterceptor.forRoot([TermMockApi]),
    }
  ]
})
export class AdminModule { }
