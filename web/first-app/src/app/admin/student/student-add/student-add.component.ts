import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {StudentService} from '../../../service/student.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Notify, Report} from 'notiflix';
import {CommonService} from '../../../service/common.service';

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

  constructor(
    private studentService: StudentService,
    private router: Router,
    private route: ActivatedRoute,
    private commonService: CommonService
  ) {
  }

  ngOnInit(): void {
    this.formGroup.addControl(this.formKeys.name, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.sex, new FormControl(0, Validators.required));
    this.formGroup.addControl(this.formKeys.clazz_id, new FormControl(null, Validators.required));
    this.formGroup.addControl(this.formKeys.sno, new FormControl('', Validators.required));
  }


  onSubmit(formGroup: FormGroup): void {
    console.log('onsubmit is called', this.formGroup.value);
    const student = {
      name: this.formGroup.get('name')?.value,
      sex: this.formGroup.get('sex')?.value,
      clazz_id: this.formGroup.get('clazz_id')?.value,
      sno: this.formGroup.get('sno')?.value
    };

    console.log('获取的内容：' + student);

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
