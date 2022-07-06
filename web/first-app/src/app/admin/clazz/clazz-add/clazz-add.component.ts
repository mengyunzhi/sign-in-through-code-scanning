import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ClazzService} from '../../../service/clazz.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Notify, Report} from 'notiflix';

@Component({
  selector: 'app-clazz-add',
  templateUrl: './clazz-add.component.html',
  styleUrls: ['./clazz-add.component.css']
})
export class ClazzAddComponent implements OnInit {
  formGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    entrance_date: new FormControl(null, Validators.required),
    length: new FormControl(null, Validators.required)
  });

  constructor(private clazzService: ClazzService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.clazzService.add({
      name: this.formGroup.get('name')?.value,
      entrance_date: this.formGroup.get('entrance_date')?.value,
      length: this.formGroup.get('length')?.value,
    })
      .subscribe(success => {
        console.log('班级添加成功', success);
        this.router.navigate(['../'], {relativeTo: this.route});
        Notify.success('添加成功', {timeout: 1000});
      }, error => {
        console.log('班级添加失败', error);
        Report.failure('添加失败', '', '确定');
      });
  }
}
