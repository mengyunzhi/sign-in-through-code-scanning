import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {MockApiTestingModule} from '../mock-api/mock-api-testing.module';
import {PageModule} from '../page/page.module';
import {PipeModule} from '../pipe/pipe.module';
import {WelcomeComponent} from '../welcome/welcome.component';

const routes: Routes = [
  {
    path: 'task',
    loadChildren: () => import('./task/task.module').then(m => m.TaskModule),
  },
  {
    path: '',
    component: WelcomeComponent
  },
];

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MockApiTestingModule,
    PageModule,
    PipeModule
  ],
  providers: [
  ]
})
export class TeacherModule { }
