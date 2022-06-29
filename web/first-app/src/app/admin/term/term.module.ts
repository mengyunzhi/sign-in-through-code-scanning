import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {TermRoutingModule} from './term-routing.module';
import {TermIndexComponent} from './index/term-index.component';
import {TermAddComponent} from './add/term-add.component';
import {TermEditComponent} from './edit/term-edit.component';
import {PageModule} from '../../page/page.module';
import {ReactiveFormsModule} from '@angular/forms';
import {PipeModule} from '../../pipe/pipe.module';
import {DateModule} from './data/date.module';



@NgModule({
  declarations: [
    TermIndexComponent,
    TermAddComponent,
    TermEditComponent
  ],
  imports: [
    CommonModule,
    TermRoutingModule,
    PageModule,
    ReactiveFormsModule,
    PipeModule,
    DateModule,
  ],
  providers: [
    DatePipe
  ]
})
export class TermModule { }
