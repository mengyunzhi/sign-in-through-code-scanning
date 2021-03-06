import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {RoomService} from '../../../service/room.service';
import {Assert} from '@yunzhi/ng-mock-api';
import {CommonService} from '../../../service/common.service';
import {CommonValidator} from '../../../validator/common-validator';

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrls: ['./room-edit.component.css']
})
export class RoomEditComponent implements OnInit {

  formGroup: FormGroup;
  id: number | undefined;

  constructor(private httpClient: HttpClient,
              private route: ActivatedRoute,
              private roomService: RoomService,
              private datePipe: DatePipe,
              private router: Router,
              private commonService: CommonService) {
    this.id = +this.route.snapshot.params.id;
    const commonValidator = new CommonValidator(httpClient);
    this.formGroup = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required, CommonValidator.nameMinLength, CommonValidator.nameMaxLength]),
        commonValidator.roomNameUnique(this.id)),
      capacity: new FormControl('', Validators.compose([Validators.required, Validators.min(1), CommonValidator.integer])),
    });
  }

  ngOnInit(): void {
    console.log('ngOnInit__id为', this.id, typeof this.id);
    this.loadData(this.id);
  }

  loadData(id: number | undefined): void {
    console.log('loadData is called');
    console.log(typeof id, id);
    Assert.isNumber(id, 'id类型错误');
    this.roomService.getById(id as number)
      .subscribe(room => {
          console.log('初始化获取room', room);
          this.formGroup.get('name')?.setValue(room.name);
          this.formGroup.get('capacity')?.setValue(room.capacity);
        },
        error => console.log('初始化获取term失败', error));
  }

  onSubmit(): void {
    this.roomService.update(this.id as number, {
      name: this.formGroup.get('name')?.value,
      capacity: this.formGroup.get('capacity')?.value,
    })
      .subscribe(success => {
          console.log('学期更新成功', success);
          this.commonService.success(() => this.router.navigate(['./../../'], {relativeTo: this.route}));
        },
        error => {
          console.log('学期更新失败', error);
          this.commonService.error();
        });
  }
}
