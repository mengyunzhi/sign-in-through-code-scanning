import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SignInStateComponent} from './sign-in-state.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: SignInStateComponent
  }
];

@NgModule({
  declarations: [SignInStateComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class SignInStateModule { }
