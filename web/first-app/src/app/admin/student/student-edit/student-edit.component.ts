import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {StudentService} from '../../../service/student.service';
import {ActivatedRoute} from '@angular/router';
import {error} from 'protractor';
import {Student} from '../../../entity/student';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {

  /**
   * 初始化表单组
   */
  formGroup = new FormGroup({
    id: new FormControl('', Validators.required)
  });
  /**
   * 表单关键字
   */
  formKeys = {
    name: 'name',
    sex: 'sex',
    clazz_id: 'clazz_id',
    number: 'number',
  };

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.formGroup.addControl(this.formKeys.name, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.sex, new FormControl(0, Validators.required));
    this.formGroup.addControl(this.formKeys.clazz_id, new FormControl(null, Validators.required));
    this.formGroup.addControl(this.formKeys.number, new FormControl('', Validators.required));

    // 根据id并找出对应的学生
    this.route.params.subscribe( param => {
      const id = +param.id;
      this.loadById(+id);
    });
  }

  loadById(id: number): void {
    this.formGroup.get('id')?.setValue(id);
    this.studentService.getById(id)
      .subscribe(student => {
        console.log('初始化获取的student');
        this.formGroup.get('name')?.setValue(student.name);
        this.formGroup.get('sex')?.setValue(student.sex);
        this.formGroup.get('clazz_id')?.setValue(student.clazz_id);
        this.formGroup.get('sno')?.setValue(student.sno);
      }, error => console.log(error));
  }

  onSubmit(formGroup: FormGroup): void {
    const id = this.formGroup.get('id')?.value;
    const student = {
      name: this.formGroup.get('name')?.value,
      sex: this.formGroup.get('sex')?.value,
      clazz_id: this.formGroup.get('clazz_id')?.value,
      sno: this.formGroup.get('sno')?.value
    } as Student;

    this.studentService.update(id, student)
      .subscribe(() => {
        console.log('保存成功');
      }, error => console.log('保存失败'));
  }
}
