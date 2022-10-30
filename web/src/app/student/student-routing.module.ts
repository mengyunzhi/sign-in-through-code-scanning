import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignInIndexComponent} from './sign-in-index/sign-in-index.component';
import {SignInSuccessComponent} from './sign-in-success/sign-in-success.component';
import {SignInSignalComponent} from './sign-in-signal/sign-in-signal.component';
import {SignInAffirmComponent} from './sign-in-affirm/sign-in-affirm.component';

const routes: Routes = [
  {
    path: '',
    component: SignInIndexComponent
  },
  {
    path: 'index',
    component: SignInIndexComponent
  },
  {
    path: 'success',
    component: SignInSuccessComponent
  },
  {
    path: 'signal',
    component: SignInSignalComponent
  },
  {
    path: 'signal/affirm',
    component: SignInAffirmComponent
  },
  {
    path: 'personal',
    loadChildren: () => import('./../admin/personal/personal.module').then(m => m.PersonalModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule {
}
