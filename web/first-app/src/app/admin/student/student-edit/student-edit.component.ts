import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {StudentService} from '../../../service/student.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Student} from '../../../entity/student';
import {Assert} from '@yunzhi/ng-mock-api';
import {Notify, Report} from 'notiflix';

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
    name: new FormControl('', Validators.required),
    sex: new FormControl(0, Validators.required),
    clazz_id: new FormControl(null, Validators.required),
    sno: new FormControl(null, Validators.required)
  });

  id: number | undefined;

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    this.id = +id;
    this.studentService.getById(this.id)
      .subscribe(student => {
        console.log('api学生获取成功', student);
        this.formGroup.get('name')?.setValue(student.name);
        this.formGroup.get('sex')?.setValue(student.sex);
        this.formGroup.get('clazz_id')?.setValue(student.klass_id);
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
    } as Student)
      .subscribe(success => {
        console.log('学生更新成功', success);
        this.router.navigate(['./../../'], {relativeTo: this.route});
        Notify.success('更新成功', {timeout: 1000});
      }, error => {
        console.log('学生更新失败', error);
        Report.failure('更新失败', '', '确定');
      });
  }
}
