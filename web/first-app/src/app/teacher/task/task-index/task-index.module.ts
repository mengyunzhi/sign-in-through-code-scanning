import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TaskIndexComponent} from './task-index.component';
import {PageModule} from '../../../page/page.module';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [TaskIndexComponent],
  imports: [
    CommonModule,
    PageModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [TaskIndexComponent]
})
export class TaskIndexModule { }
