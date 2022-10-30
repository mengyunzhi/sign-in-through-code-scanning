import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {PersonalIndexComponent} from './personal-index/personal-index.component';
import {PersonalEditComponent} from './personal-edit/personal-edit.component';

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

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalRoutingModule { }
