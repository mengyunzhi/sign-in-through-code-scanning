import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MockApiInterceptor} from '@yunzhi/ng-mock-api';
import {TermMockApi} from './term.mock.api';
import {StudentMockApi} from './student.mock.api';
import {ScheduleMockApi} from './schedule.mock.api';
import {RoomMockApi} from './room.mock.api';
import {TeacherMockApi} from './teacher.mock.api';
import {ClazzMockApi} from './clazz.mock.api';
import {CourseMockApi} from './course.mock.api';
import {UserMockApi} from "./user.mock.api";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, multi: true,
      useClass: MockApiInterceptor.forRoot([
        TermMockApi,
        StudentMockApi,
        ScheduleMockApi,
        RoomMockApi,
        TeacherMockApi,
        ClazzMockApi,
        CourseMockApi,
        UserMockApi
      ]),
    }
  ],
  exports: [
    HttpClientModule
  ]
})
export class MockApiTestingModule {
}
