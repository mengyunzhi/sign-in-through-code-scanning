import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TermScheduleComponent} from './term-schedule.component';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [TermScheduleComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [TermScheduleComponent]
})
export class TermScheduleModule {
}
