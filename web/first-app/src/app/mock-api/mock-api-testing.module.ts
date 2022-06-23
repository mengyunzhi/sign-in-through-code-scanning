import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {MockApiInterceptor} from '@yunzhi/ng-mock-api';
import {TermMockApi} from './term.mock.api';
import {StudentMockApi} from './student.mock.api';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, multi: true,
      useClass: MockApiInterceptor.forRoot([TermMockApi, StudentMockApi]),
    }
  ]
})
export class MockApiTestingModule { }
