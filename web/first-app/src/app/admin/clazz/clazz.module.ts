import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClazzIndexComponent} from './clazz-index/clazz-index.component';
import {ClazzMembersComponent} from './clazz-members/clazz-members.component';
import {ClazzAddComponent} from './clazz-add/clazz-add.component';
import {ClazzEditComponent} from './clazz-edit/clazz-edit.component';
import {ClazzMembersAddComponent} from './clazz-members-add/clazz-members-add.component';
import {ClazzMembersEditComponent} from './clazz-mebers-edit/clazz-mebers-edit.component';
import {ClazzRoutingModule} from './clazz-routing.module';
import {ClazzSelectComponent} from './clazz-select/clazz-select.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PageModule} from '../../page/page.module';
import {ClazzShareModule} from './clazz-share.module';

@NgModule({
  declarations: [ClazzIndexComponent,
    ClazzMembersComponent,
    ClazzAddComponent,
    ClazzEditComponent,
    ClazzMembersAddComponent,
    ClazzMembersEditComponent,
  ],
  imports: [
    CommonModule,
    ClazzRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PageModule,
    ClazzShareModule
  ]
})
export class ClazzModule {
}
