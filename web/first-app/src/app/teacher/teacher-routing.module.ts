import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
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
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class TeacherRoutingModule { }
