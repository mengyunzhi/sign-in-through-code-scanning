import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
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
    name: new FormControl(''),
    entrance_date: new FormControl(null),
    length: new FormControl(null)
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
