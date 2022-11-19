import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {StudentService} from '../../../service/student.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Notify, Report} from 'notiflix';
import {CommonService} from '../../../service/common.service';
import {CommonValidator} from '../../../validator/common-validator';
import {HttpClient} from '@angular/common/http';
import {UserService} from "../../../service/user.service";
import {Student} from "../../../entity/student";
import {User} from "../../../entity/user";
import {Clazz} from "../../../entity/clazz";

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css']
})
export class StudentAddComponent implements OnInit {

  /**
   * 初始化表单组
   */
  formGroup = new FormGroup({});
  /**
   * 表单关键字
   */
  formKeys = {
    name: 'name',
    sex: 'sex',
    clazz_id: 'clazz_id',
    sno: 'sno',
  };

  indexStudentPassword = '';

  constructor(
    private studentService: StudentService,
    private router: Router,
    private route: ActivatedRoute,
    private commonService: CommonService,
    private httpClient: HttpClient,
    private  userService: UserService
  ) {
    const commonValidator = new CommonValidator(httpClient);
    this.formGroup.addControl(this.formKeys.name, new FormControl('',
      Validators.compose([Validators.required, CommonValidator.nameMinLength, CommonValidator.nameMaxLength])));
    this.formGroup.addControl(this.formKeys.sex, new FormControl(0, Validators.compose([Validators.required, CommonValidator.sex])));
    this.formGroup.addControl(this.formKeys.clazz_id, new FormControl(null, Validators.required));
    this.formGroup.addControl(this.formKeys.sno, new FormControl('',
      Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20), CommonValidator.sno]),
      commonValidator.snoUnique()));

  }

  ngOnInit(): void {
    const cacheDefaultPassword = window.sessionStorage.getItem('cacheDefaultPassword');
    if (cacheDefaultPassword === null) {
      this.userService.getDefaultPassword()
        .subscribe(success => {
          window.sessionStorage.setItem('cacheDefaultPassword', success);
          // this.indexStudentPassword = success;
          console.log(this.indexStudentPassword);
        }, error => {
          console.log(error);
        });
    }
    // @ts-ignore
    this.indexStudentPassword = window.sessionStorage.getItem('cacheDefaultPassword');
  }


  onSubmit(formGroup: FormGroup): void {
    let cacheDefaultPassword = window.sessionStorage.getItem('cacheDefaultPassword');
    if (cacheDefaultPassword === null) {
      cacheDefaultPassword = 'NoCache';
    }
    console.log('onsubmit is called', this.formGroup.value);
    const student = {
      user: {
        name: this.formGroup.get('name')?.value,
        sex: this.formGroup.get('sex')?.value,
        password: cacheDefaultPassword,
      } as User,
      clazz: {
        id: this.formGroup.get('clazz_id')?.value,
      } as Clazz,
      sno: this.formGroup.get('sno')?.value
    } as Student;

    this.studentService.save(student)
      .subscribe(() => {
        console.log('保存成功');
        this.commonService.success(() => this.router.navigate(['../'], {relativeTo: this.route}));
      }, error => {
        console.log('保存失败');
        this.commonService.error();
      });
  }
}
