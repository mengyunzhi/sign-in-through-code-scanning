import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TermIndexComponent} from './index/term-index.component';
import {TermEditComponent} from './edit/term-edit.component';
import {TermAddComponent} from './add/term-add.component';

const routes: Routes = [
  {
    path: '',
    component: TermIndexComponent,
  },
  {
    path: 'add',
    component: TermAddComponent,
  },
  {
    path: 'edit/:id',
    component: TermEditComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TermRoutingModule { }
