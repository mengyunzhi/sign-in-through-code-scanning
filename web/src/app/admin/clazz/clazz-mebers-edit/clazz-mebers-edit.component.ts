import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {StudentService} from '../../../service/student.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Assert} from '@yunzhi/ng-mock-api';
import {CommonService} from '../../../service/common.service';
import {CommonValidator} from '../../../validator/common-validator';
import {HttpClient} from '@angular/common/http';
import {User} from "../../../entity/user";
import {Student} from "../../../entity/student";

@Component({
  selector: 'app-clazz-mebers-edit',
  templateUrl: './clazz-members-edit.component.html',
  styleUrls: ['./clazz-members-edit.component.css']
})
export class ClazzMembersEditComponent implements OnInit {

  formGroup: FormGroup;

  clazz_id: number | undefined;
  id: number | undefined;

  constructor(private studentService: StudentService,
              private route: ActivatedRoute,
              private router: Router,
              private commonService: CommonService,
              private httpClient: HttpClient) {
    this.id = +this.route.snapshot.params.id;
    const commonValidator = new CommonValidator(httpClient);
    this.formGroup = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required, CommonValidator.nameMinLength, CommonValidator.nameMaxLength])),
      sex: new FormControl(0, Validators.compose([Validators.required, CommonValidator.sex])),
      sno: new FormControl('',
        Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20), CommonValidator.sno]),
        commonValidator.snoUnique(this.id))
    });

  }

  ngOnInit(): void {
    this.clazz_id = +this.route.snapshot.params.clazz_id;
    this.id = +this.route.snapshot.params.id;
    this.studentService.getById(this.id)
      .subscribe(student => {
        this.formGroup.get('name')?.setValue(student.user.name);
        this.formGroup.get('sex')?.setValue(student.user.sex);
        this.formGroup.get('sno')?.setValue(student.sno);
      }, error => {
        console.log('学生请求失败', error);
      });
  }

  onSubmit(): void {
    Assert.isNumber(this.clazz_id, this.id, 'clazz_id 或者 id类型不是number');
    this.studentService.update(this.id as number, {
      user: {
        name: this.formGroup.get('name')?.value,
        sex: this.formGroup.get('sex')?.value,
      },
      sno: this.formGroup.get('sno')?.value,
      clazz: {
        id: this.clazz_id as number
      }
    } as Student)
      .subscribe(success => {
        console.log('班级更新成功', success);
        this.commonService.success(() => {
          this.router.navigate(['./../../'], {relativeTo: this.route}).then();
        });
      }, error => {
        console.log('班级更新失败', error);
        this.commonService.error(() => {});
      });
  }

}
