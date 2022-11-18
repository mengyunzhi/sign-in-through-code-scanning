import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TeacherService} from '../../../service/teacher.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '../../../service/common.service';
import {CommonValidator} from '../../../validator/common-validator';
import {Validator} from '../../../validator/validator';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../../../service/user.service';

@Component({
  selector: 'app-teacher-add',
  templateUrl: './teacher-add.component.html',
  styleUrls: ['./teacher-add.component.css']
})
export class TeacherAddComponent implements OnInit {

  formGroup: FormGroup;
  // formKeys = {
  //   name: 'name',
  //   sex: 'sex',
  //   number: 'number'
  // };

  indexTeacherPassword = '';

  constructor(private teacherService: TeacherService,
              private router: Router,
              private route: ActivatedRoute,
              private commonService: CommonService,
              private httpClient: HttpClient,
              private userService: UserService) {
    const commonValidator = new CommonValidator(httpClient);
    this.formGroup = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required, CommonValidator.nameMinLength, CommonValidator.nameMaxLength])),
      sex: new FormControl(0, Validators.compose([Validators.required, CommonValidator.sex])),
      number: new FormControl('', [Validators.required, Validator.isPhoneNumber], commonValidator.numberUnique())
    });
  }

  ngOnInit(): void {
    // this.formGroup.addControl(this.formKeys.name, new FormControl('', Validators.required));
    // this.formGroup.addControl(this.formKeys.sex, new FormControl('', Validators.required));
    // this.formGroup.addControl(this.formKeys.number, new FormControl('', [Validators.required, Validator.isPhoneNumber]));
    this.userService.getDefaultPassword()
      .subscribe(success => {
        this.indexTeacherPassword = success;
        console.log(this.indexTeacherPassword);
      }, error => {
        console.log(error);
      });
  }

  onSubmit(): void {
    console.log('onsubmit is called', this.formGroup.value);
    this.teacherService.add({
      name: this.formGroup.get('name')?.value,
      sex: this.formGroup.get('sex')?.value,
      number: this.formGroup.get('number')?.value,
    })
      .subscribe(success => {
        console.log('教师添加成功', success);
        this.commonService.success(() => this.router.navigate(['../'], {relativeTo: this.route}));
      }, error => {
        console.log('教师添加失败', error);
        this.commonService.error();
      });
  }

}
