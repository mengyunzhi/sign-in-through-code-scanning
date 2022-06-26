import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ViewStudentComponent} from './view-student.component';
import {RouterModule, Routes} from '@angular/router';
import {PipeModule} from '../../../pipe/pipe.module';
import {PageModule} from '../../../page/page.module';

const routes: Routes = [
  {
    path: '',
    component: ViewStudentComponent
  }
];

@NgModule({
  declarations: [
    ViewStudentComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PipeModule,
    PageModule
  ],
  exports: [
    ViewStudentComponent
  ]
})
export class ViewStudentModule { }
