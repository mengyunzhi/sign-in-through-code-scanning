import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RoomIndexComponent} from './room-index/room-index.component';
import {RoomAddComponent} from './room-add/room-add.component';
import {RoomEditComponent} from './room-edit/room-edit.component';


const routes: Routes = [
  {
    path: '',
    component: RoomIndexComponent
  },
  {
    path: 'add',
    component: RoomAddComponent
  },
  {
    path: 'edit/:id',
    component: RoomEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomRoutingModule { }
