import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {
    path: 'admin',
    // 惰性加载
    loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule)
  },
  {
    // 学生模块
    path: 'student',
    loadChildren: () => import('./student/student.module').then(mod => mod.StudentModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
