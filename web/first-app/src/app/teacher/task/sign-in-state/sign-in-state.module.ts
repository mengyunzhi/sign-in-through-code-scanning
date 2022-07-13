import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SignInStateComponent} from './sign-in-state.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [SignInStateComponent],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    SignInStateComponent
  ]
})
export class SignInStateModule { }
