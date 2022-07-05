import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TeacherService} from '../../../service/teacher.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Notify, Report} from 'notiflix';

@Component({
  selector: 'app-teacher-add',
  templateUrl: './teacher-add.component.html',
  styleUrls: ['./teacher-add.component.css']
})
export class TeacherAddComponent implements OnInit {

  formGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    sex: new FormControl(0, Validators.required),
    number: new FormControl(null)
  });

  constructor(private teacherService: TeacherService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
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
        this.router.navigate(['../'], {relativeTo: this.route});
        Notify.success('添加成功', {timeout: 1000});
      }, error => {
        console.log('教师添加失败', error);
        Report.failure('添加失败', '', '确定');
      });
  }

}
