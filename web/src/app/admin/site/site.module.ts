import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateStudentIndexPasswordComponent } from './update-student-index-password/update-student-index-password.component';
import { UpdateTeacherIndexPasswordComponent } from './update-teacher-index-password/update-teacher-index-password.component';
import {SiteIndexComponent} from './site-index/site-index.component';
import {SiteRoutingModule} from './site-routing.module';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    UpdateStudentIndexPasswordComponent,
    UpdateTeacherIndexPasswordComponent,
    SiteIndexComponent],
  imports: [
    CommonModule,
    SiteRoutingModule,
    ReactiveFormsModule,
  ]
})
export class SiteModule { }
