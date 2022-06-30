import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TaskIndexComponent} from './task-index.component';
import {RouterModule, Routes} from '@angular/router';
import {PageModule} from '../../../page/page.module';

const routes: Routes = [
  {
    path: '',
    component: TaskIndexComponent
  },
];

@NgModule({
  declarations: [TaskIndexComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PageModule
  ],
  exports: [TaskIndexComponent]
})
export class TaskIndexModule { }
