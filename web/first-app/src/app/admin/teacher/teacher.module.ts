import {NgModule, Pipe} from '@angular/core';
import { CommonModule } from '@angular/common';
import {TeacherAddComponent} from './teacher-add/teacher-add.component';
import {TeacherEditComponent} from './teacher-edit/teacher-edit.component';
import {TeacherUpdatePasswordComponent} from './teacher-update-password/teacher-update-password.component';
import {TeacherRoutingModule} from './teacher-routing.module';
import {PageModule} from '../../page/page.module';
import {TeacherIndexModule} from './teacher-index/teacher-index.module';
import {ReactiveFormsModule} from '@angular/forms';
import {PipeModule} from '../../pipe/pipe.module';

@NgModule({
  declarations: [
    TeacherAddComponent,
    TeacherEditComponent,
    TeacherUpdatePasswordComponent,
  ],
  imports: [
    TeacherIndexModule,
    CommonModule,
    TeacherRoutingModule,
    PageModule,
    ReactiveFormsModule,
  ]
})
export class TeacherModule { }
