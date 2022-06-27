import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TeacherIndexComponent} from './teacher-index/teacher-index.component';
import {TeacherAddComponent} from './teacher-add/teacher-add.component';
import {TeacherEditComponent} from './teacher-edit/teacher-edit.component';
import {TeacherUpdatePasswordComponent} from './teacher-update-password/teacher-update-password.component';
import {TeacherRoutingModule} from './teacher-routing.module';
import {PageModule} from '../../page/page.module';
import {TeacherIndexModule} from './teacher-index/teacher-index.module';

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
  ]
})
export class TeacherModule { }
