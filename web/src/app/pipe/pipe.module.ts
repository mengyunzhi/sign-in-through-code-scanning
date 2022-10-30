import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TermStatePipe} from './term-state.pipe';
import {SexPipe} from './sex.pipe';
import { RolePipe } from './role.pipe';



@NgModule({
  declarations: [
    TermStatePipe,
    SexPipe,
    RolePipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TermStatePipe,
    SexPipe,
    RolePipe
  ]
})
export class PipeModule { }
