import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule, DatePipe, Location} from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { IndexComponent } from './index/index.component';
import { WelcomeComponent } from './welcome/welcome.component';
import {ApiInterceptor} from './interceptor/api.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    IndexComponent,
    WelcomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    // MockApiTestingModule
  ],
  providers: [
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS, multi: true,
      useClass: ApiInterceptor
    },
  ],
  bootstrap: [IndexComponent]
})
export class AppModule { }
