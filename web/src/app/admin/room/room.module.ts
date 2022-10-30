import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RoomRoutingModule} from './room-routing.module';
import {RoomEditComponent} from './room-edit/room-edit.component';
import {RoomIndexComponent} from './room-index/room-index.component';
import {RoomAddComponent} from './room-add/room-add.component';
import {PageModule} from '../../page/page.module';
import {ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ApiInterceptor} from '../../interceptor/api.interceptor';



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
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, multi: true,
      useClass: ApiInterceptor
    }
  ]
})
export class RoomModule { }
