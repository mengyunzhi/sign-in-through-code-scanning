import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {PageModule} from '../page/page.module';
import {AdminRoutingModule} from './admin-routing.module';
import {PipeModule} from '../pipe/pipe.module';
import {ApiInterceptor} from '../interceptor/api.interceptor';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule,
    PageModule,
    ReactiveFormsModule,
    PipeModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, multi: true,
      useClass: ApiInterceptor
    }
  ]
})
export class AdminModule { }
