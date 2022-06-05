import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TermIndexComponent } from './admin/term/index/term-index.component';
import { TermAddComponent } from './admin/term/add/term-add.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MockApiInterceptor} from '@yunzhi/ng-mock-api';
import {TermMockApi} from './mock-api/term.mock.api';
import { TermEditComponent } from './admin/term/edit/term-edit.component';
import { TermStatePipe } from './admin/pipe/term-state.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TermIndexComponent,
    TermAddComponent,
    TermEditComponent,
    TermStatePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, multi: true,
      useClass: MockApiInterceptor.forRoot([TermMockApi])
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
