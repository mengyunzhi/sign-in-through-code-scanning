import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RoomRoutingModule} from './room-routing.module';
import {RoomEditComponent} from './room-edit/room-edit.component';
import {RoomIndexComponent} from './room-index/room-index.component';
import {RoomAddComponent} from './room-add/room-add.component';
import {PageModule} from '../../page/page.module';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';



@NgModule({
  declarations: [
    RoomEditComponent,
    RoomIndexComponent,
    RoomAddComponent
  ],
  imports: [
    CommonModule,
    RoomRoutingModule,
    PageModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class RoomModule { }
