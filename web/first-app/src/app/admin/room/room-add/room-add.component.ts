import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Notify, Report} from 'notiflix';
import {RoomService} from '../../../service/room.service';
import {ActivatedRoute, Router} from '@angular/router';

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

  constructor(private roomService: RoomService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log('保存');
    const room = this.formGroup.value as {
      name: string,
      capacity: number
    };
    console.log(room);
    this.roomService.add(room)
      .subscribe(success => {
          console.log('添加成功', success);
          this.router.navigate(['../'], {relativeTo: this.route});
          Notify.success('添加成功', {timeout: 1000});
        },
        error => {
          console.log('添加失败', error);
          Report.failure('添加失败', '', '确定');
        });
  }
}
