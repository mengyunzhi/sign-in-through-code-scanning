import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {StudentService} from '../../../service/student.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Student} from '../../../entity/student';
import {Assert} from '@yunzhi/ng-mock-api';
import {Notify, Report} from 'notiflix';

@Component({
  selector: 'app-clazz-members-add',
  templateUrl: './clazz-members-add.component.html',
  styleUrls: ['./clazz-members-add.component.css']
})
export class ClazzMembersAddComponent implements OnInit {

  formGroup: FormGroup = new FormGroup({
    name:　new FormControl('', Validators.required),
    sex:　new FormControl(null, Validators.required),
    sno:　new FormControl(null, Validators.required),
  });

  clazz_id: number | undefined;

  constructor(private studentService: StudentService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.clazz_id = +this.route.snapshot.params.clazz_id;
  }

  onSubmit(): void {
    Assert.isNumber(this.clazz_id, 'clazz_id类型错误');
    this.studentService.save({
      name: this.formGroup.get('name')?.value,
      sex: this.formGroup.get('sex')?.value,
      sno: this.formGroup.get('sno')?.value,
      clazz_id: this.clazz_id as number
    })
      .subscribe(success => {
        console.log('添加成功', success);
        this.router.navigate(['../'], {relativeTo: this.route});
        Notify.success('添加成功', {timeout: 1000});
      }, error => {
        console.log('添加失败', error);
        Report.failure('添加失败', '', '确定');
      });
  }

}
