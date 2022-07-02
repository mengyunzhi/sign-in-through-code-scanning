import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Term} from '../../../entity/term';
import {DatePipe} from '@angular/common';
import {TermService} from '../../../service/term.service';
import {Assert} from '@yunzhi/ng-mock-api';
import {Report} from 'notiflix';

@Component({
  selector: 'app-term-edit',
  templateUrl: './term-edit.component.html',
  styleUrls: ['./term-edit.component.css']
})
export class TermEditComponent implements OnInit {

  formGroup: FormGroup;
  id: number | undefined;

  constructor(private httpClient: HttpClient,
              private route: ActivatedRoute,
              private termService: TermService,
              private datePipe: DatePipe,
              private router: Router) {
    this.formGroup = new FormGroup({
      name : new FormControl('', Validators.required),
      start_time : new FormControl('', Validators.required),
      end_time : new FormControl('', Validators.required),
      state : new FormControl(0, Validators.required),
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    this.id = +id;
    console.log('ngOnInit__id为', this.id, typeof this.id);
    this.loadData(+id);
  }

  loadData(id: number | undefined): void {
    console.log('loadData is called');
    console.log(typeof id, id);
    Assert.isNumber(id, 'id类型错误');
    this.termService.getById(id as number)
      .subscribe(term => {
          console.log('初始化获取term', term);
          this.formGroup.get('name')?.setValue(term.name);
          this.formGroup.get('start_time')?.setValue(this.datePipe.transform(+term.start_time * 1000, 'yyyy-MM-dd'));
          this.formGroup.get('end_time')?.setValue(this.datePipe.transform(+term.end_time * 1000, 'yyyy-MM-dd'));
          this.formGroup.get('state')?.setValue(term.state);
        },
        error => console.log('初始化获取term失败', error));
  }

  onSubmit(): void {
    this.termService.update(this.id as number, {
      name: this.formGroup.get('name')?.value,
      start_time: this.formGroup.get('start_time')?.value,
      end_time: this.formGroup.get('end_time')?.value,
      state: this.formGroup.get('state')?.value,
    })
      .subscribe(success => {
          console.log('学期更新成功', success);
          this.router.navigate(['./../../'], {relativeTo: this.route});
        },
        error => {
          console.log('学期更新失败', error);
          Report.failure('更新失败', '', '确定');
        });
  }
}
