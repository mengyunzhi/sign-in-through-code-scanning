import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {StudentService} from '../../../service/student.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Assert} from '@yunzhi/ng-mock-api';
import {Notify, Report} from 'notiflix';

@Component({
  selector: 'app-clazz-mebers-edit',
  templateUrl: './clazz-members-edit.component.html',
  styleUrls: ['./clazz-members-edit.component.css']
})
export class ClazzMembersEditComponent implements OnInit {

  formGroup: FormGroup = new FormGroup({
    name:　new FormControl('', Validators.required),
    sex:　new FormControl(null, Validators.required),
    sno:　new FormControl(null, Validators.required),
  });

  clazz_id: number | undefined;
  id: number | undefined;

  constructor(private studentService: StudentService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.clazz_id = +this.route.snapshot.params.clazz_id;
    this.id = +this.route.snapshot.params.id;
    this.studentService.getById(this.id)
      .subscribe(student => {
        this.formGroup.get('name')?.setValue(student.name);
        this.formGroup.get('sex')?.setValue(student.sex);
        this.formGroup.get('sno')?.setValue(student.sno);
      }, error => {
        console.log('学生请求失败', error);
      });
  }

  onSubmit(): void {
    Assert.isNumber(this.clazz_id, this.id, 'clazz_id 或者 id类型不是number');
    this.studentService.update(this.id as number, {
      name: this.formGroup.get('name')?.value,
      sex: this.formGroup.get('sex')?.value,
      sno: this.formGroup.get('sno')?.value,
      clazz_id: this.clazz_id as number
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
