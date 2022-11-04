import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SignInIndexComponent} from './sign-in-index/sign-in-index.component';
import {SignInSuccessComponent} from './sign-in-success/sign-in-success.component';
import {SignInSignalComponent} from './sign-in-signal/sign-in-signal.component';
import {SignInAffirmComponent} from './sign-in-affirm/sign-in-affirm.component';
import {StudentRoutingModule} from './student-routing.module';


@NgModule({
  declarations: [
    SignInIndexComponent,
    SignInSuccessComponent,
    SignInSignalComponent,
    SignInAffirmComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule
  ]
})
export class StudentModule {
}
