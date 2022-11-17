import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {StudentService} from '../../../service/student.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Assert} from '@yunzhi/ng-mock-api';
import {CommonService} from '../../../service/common.service';
import {CommonValidator} from '../../../validator/common-validator';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {

  /**
   * 初始化表单组
   */
  formGroup: FormGroup;

  id: number | undefined;

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router,
    private commonService: CommonService,
    private httpClient: HttpClient
  ) {
    this.id = +this.route.snapshot.params.id;
    const commonValidator = new CommonValidator(httpClient);
    this.formGroup = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required, CommonValidator.nameMinLength, CommonValidator.nameMaxLength])),
      sex: new FormControl(0, Validators.compose([Validators.required, CommonValidator.sex])),
      clazz_id: new FormControl(null, Validators.required),
      sno: new FormControl('',
        Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20), CommonValidator.sno]),
        commonValidator.snoUnique(this.id))
    });
  }

  ngOnInit(): void {
    Assert.isNumber(this.id, 'id类型错误');
    this.studentService.getById(this.id as number)
      .subscribe(student => {
        console.log('api学生获取成功', student);
        this.formGroup.get('name')?.setValue(student.name);
        this.formGroup.get('sex')?.setValue(student.sex);
        this.formGroup.get('clazz_id')?.setValue(student.clazz?.id);
        this.formGroup.get('sno')?.setValue(student.sno);
      });
  }

  onSubmit(): void {
    Assert.isNumber(this.id, 'id类型不是number');
    this.studentService.update(this.id as number, {
      name: this.formGroup.get('name')?.value,
      sex: this.formGroup.get('sex')?.value,
      clazz_id: this.formGroup.get('clazz_id')?.value,
      sno: this.formGroup.get('sno')?.value
    })
      .subscribe(success => {
        console.log('学生更新成功', success);
        this.commonService.success(() => this.router.navigate(['./../../'], {relativeTo: this.route}));
      }, error => {
        console.log('学生更新失败', error);
        this.commonService.error();
      });
  }
}
