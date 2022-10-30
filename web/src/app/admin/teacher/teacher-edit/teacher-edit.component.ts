import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TeacherService} from '../../../service/teacher.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Assert} from '@yunzhi/ng-mock-api';
import {CommonService} from '../../../service/common.service';
import {CommonValidator} from '../../../validator/common-validator';
import {Validator} from '../../../validator/validator';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-teacher-edit',
  templateUrl: './teacher-edit.component.html',
  styleUrls: ['./teacher-edit.component.css']
})
export class TeacherEditComponent implements OnInit {

  formGroup: FormGroup;
  id: number | undefined;
  constructor(private teacherService: TeacherService,
              private route: ActivatedRoute,
              private router: Router,
              private commonService: CommonService,
              private httpClient: HttpClient) {
    // id为teacher所对应的user_id
    this.id = +this.route.snapshot.params.id;
    const commonValidator = new CommonValidator(httpClient);
    this.formGroup = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required, CommonValidator.nameMinLength, CommonValidator.nameMaxLength])),
      sex: new FormControl(0, Validators.compose([Validators.required, CommonValidator.sex])),
      number: new FormControl('', [Validators.required, Validator.isPhoneNumber], commonValidator.numberUnique(this.id))
    });
  }

  ngOnInit(): void {
    Assert.isNumber(this.id, 'id类型错误');
    this.teacherService.getById(this.id as number)
      .subscribe(teacher => {
        console.log('api教师获取成功', teacher);
        this.formGroup.get('name')?.setValue(teacher.name);
        this.formGroup.get('sex')?.setValue(teacher.sex);
        this.formGroup.get('number')?.setValue(teacher.number);
      }, error => {
        console.log('api教师获取失败', error);
      });
  }

  onSubmit(): void {
    Assert.isNumber(this.id, 'id类型不是number');
    this.teacherService.update(this.id as number, {
      name: this.formGroup.get('name')?.value,
      sex: this.formGroup.get('sex')?.value,
      number: this.formGroup.get('number')?.value,
    })
      .subscribe(success => {
        console.log('教师更新成功', success);
        this.commonService.success(() => this.router.navigate(['./../../'], {relativeTo: this.route}));
      }, error => {
        console.log('教师更新失败', error);
        this.commonService.error();
      });

  }
}
