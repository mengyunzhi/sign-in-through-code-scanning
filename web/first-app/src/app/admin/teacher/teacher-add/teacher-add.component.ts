import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TeacherService} from '../../../service/teacher.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '../../../service/common.service';
import {CommonValidator} from '../../../validator/common-validator';

@Component({
  selector: 'app-teacher-add',
  templateUrl: './teacher-add.component.html',
  styleUrls: ['./teacher-add.component.css']
})
export class TeacherAddComponent implements OnInit {

  formGroup = new FormGroup({
    name: new FormControl('', Validators.compose([Validators.required, CommonValidator.nameMinLength, CommonValidator.nameMaxLength])),
    sex: new FormControl(0, Validators.compose([Validators.required, CommonValidator.sex])),
    number: new FormControl('', Validators.required)
  });

  constructor(private teacherService: TeacherService,
              private router: Router,
              private route: ActivatedRoute,
              private commonService: CommonService) { }

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
        this.commonService.success(() => this.router.navigate(['../'], {relativeTo: this.route}));
      }, error => {
        console.log('教师添加失败', error);
        this.commonService.error();
      });
  }

}
