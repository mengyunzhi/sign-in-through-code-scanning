import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PersonalEditComponent} from './personal-edit/personal-edit.component';
import {PersonalIndexComponent} from './personal-index/personal-index.component';
import {RouterModule, Routes} from '@angular/router';

/*定义路由*/
const routes: Routes = [
  {
    path: '',
    component: PersonalIndexComponent
  },  {
    path: 'edit',
    component: PersonalEditComponent
  }
];

/**
 * 管理端-》个人中心
 */
@NgModule({
  declarations: [PersonalIndexComponent, PersonalEditComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class PersonalModule {
}
