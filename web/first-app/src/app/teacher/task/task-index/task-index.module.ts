import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TaskIndexComponent} from './task-index.component';
import {PageModule} from '../../../page/page.module';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [TaskIndexComponent],
  imports: [
    CommonModule,
    PageModule,
    RouterModule
  ],
  exports: [TaskIndexComponent]
})
export class TaskIndexModule { }
