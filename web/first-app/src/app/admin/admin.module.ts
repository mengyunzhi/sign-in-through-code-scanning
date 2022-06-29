import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TermIndexComponent} from './term/index/term-index.component';
import {TermAddComponent} from './term/add/term-add.component';
import {TermEditComponent} from './term/edit/term-edit.component';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {PageModule} from '../page/page.module';
import {MockApiTestingModule} from '../mock-api/mock-api-testing.module';
import {AdminRoutingModule} from './admin-routing.module';
import {TeacherModule} from './teacher/teacher.module';
import {PipeModule} from '../pipe/pipe.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    TeacherModule,
    AdminRoutingModule,
    HttpClientModule,
    PageModule,
    ReactiveFormsModule,
    MockApiTestingModule,
    PipeModule,
  ],
  exports: [
  ],
  providers: [
  ]
})
export class AdminModule { }
