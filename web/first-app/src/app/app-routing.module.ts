import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TermIndexComponent} from './admin/term/index/term-index.component';

const routes: Routes = [
  {
    path: 'admin',
    component: TermIndexComponent
  },
  {
    path: 'admin/term',
    component: TermIndexComponent
  },
  {
    path: 'student',
    // 惰性加载
    loadChildren: () => import('./admin/student/student.module').then(mod => mod.StudentModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
