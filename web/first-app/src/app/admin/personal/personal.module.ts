import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PersonalEditComponent} from './personal-edit/personal-edit.component';
import {PersonalIndexComponent} from './personal-index/personal-index.component';
import {PersonalRoutingModule} from './personal-routing.module';

/**
 * 管理端-》个人中心
 */
@NgModule({
  declarations: [PersonalIndexComponent, PersonalEditComponent],
  imports: [
    CommonModule,
    PersonalRoutingModule
  ]
})
export class PersonalModule {
}
