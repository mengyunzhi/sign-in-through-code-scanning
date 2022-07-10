import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Notify, Report} from 'notiflix';
import {RoomService} from '../../../service/room.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '../../../service/common.service';

@Component({
  selector: 'app-room-add',
  templateUrl: './room-add.component.html',
  styleUrls: ['./room-add.component.css']
})
export class RoomAddComponent implements OnInit {

  formGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    capacity: new FormControl(null, Validators.required),
  });

  constructor(private roomService: RoomService,
              private router: Router,
              private route: ActivatedRoute,
              private commonService: CommonService) {
  }

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
          this.commonService.success(() => this.router.navigate(['../'], {relativeTo: this.route}));
        },
        error => {
          console.log('添加失败', error);
          this.commonService.error();
        });
  }
}
