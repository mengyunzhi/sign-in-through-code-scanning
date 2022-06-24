import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MockApiInterceptor} from '@yunzhi/ng-mock-api';
import {TermMockApi} from './term.mock.api';
import {StudentMockApi} from './student.mock.api';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, multi: true,
      useClass: MockApiInterceptor.forRoot([TermMockApi, StudentMockApi]),
    }
  ],
  exports: [
    HttpClientModule
  ]
})
export class MockApiTestingModule { }
