import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Report} from 'notiflix';
import {RoomService} from '../../../service/room.service';

@Component({
  selector: 'app-room-add',
  templateUrl: './room-add.component.html',
  styleUrls: ['./room-add.component.css']
})
export class RoomAddComponent implements OnInit {

  formGroup = new FormGroup({
    name : new FormControl('', Validators.required),
    capacity : new FormControl(null, Validators.required),
  });

  constructor(private roomService: RoomService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log('保存');
    const room = this.formGroup.value as {
      name: string,
      capacity: number
    };
    console.log(room);
    this.roomService.add(room);
  }
}
