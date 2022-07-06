import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ClazzService} from '../../../service/clazz.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Assert} from '@yunzhi/ng-mock-api';
import {DatePipe} from '@angular/common';
import {Notify, Report} from 'notiflix';

@Component({
  selector: 'app-clazz-edit',
  templateUrl: './clazz-edit.component.html',
  styleUrls: ['./clazz-edit.component.css']
})
export class ClazzEditComponent implements OnInit {
  formGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    entrance_date: new FormControl(null, Validators.required),
    length: new FormControl(null, Validators.required)
  });

  clazz_id: number | undefined;

  constructor(private clazzService: ClazzService,
              private route: ActivatedRoute,
              private datePipe: DatePipe,
              private router: Router) { }

  ngOnInit(): void {
    const clazz_id = +(this.route.snapshot.params.clazz_id);
    this.clazz_id = clazz_id;
    Assert.isNumber(clazz_id, 'clazz_id类型不是number');
    this.clazzService.getById(clazz_id)
      .subscribe(data => {
        this.formGroup.get('name')?.setValue(data.name);
        this.formGroup.get('entrance_date')?.setValue(this.datePipe.transform(+data.entrance_date * 1000, 'yyyy-MM-dd'));
        this.formGroup.get('length')?.setValue(data.length);
      });
  }

  onSubmit(): void {
    Assert.isNumber(this.clazz_id, 'clazz_id类型不是number');
    this.clazzService.update(this.clazz_id as number, {
      name: this.formGroup.get('name')?.value,
      entrance_date: this.formGroup.get('entrance_date')?.value,
      length: this.formGroup.get('length')?.value
    })
      .subscribe(success => {
        console.log('班级更新成功', success);
        this.router.navigate(['./../../'], {relativeTo: this.route});
        Notify.success('更新成功', {timeout: 1000});
      }, error => {
        console.log('班级更新失败', error);
        Report.failure('更新失败', '', '确定');
      });
  }



}
