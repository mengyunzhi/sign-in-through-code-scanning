import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {DatePipe} from '@angular/common';
import {TermService} from '../../../service/term.service';
import {Assert} from '@yunzhi/ng-mock-api';
import {CommonService} from '../../../service/common.service';
import {CommonValidator} from '../../../validator/common-validator';

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
              private router: Router,
              private commService: CommonService) {
    this.id = +this.route.snapshot.params.id;
    const commonValidator = new CommonValidator(httpClient);
    this.formGroup = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required, CommonValidator.nameMinLength, CommonValidator.nameMaxLength]),
        commonValidator.termNameUnique(this.id)),
      start_time: new FormControl(null, Validators.required),
      end_time: new FormControl(null, Validators.required),
      state: new FormControl(0, Validators.required),
    });
  }
  isDateRight = true;

  ngOnInit(): void {
    console.log('ngOnInit__id为', this.id, typeof this.id);
    this.loadData(this.id);
    this.formGroup.get('end_time')?.valueChanges
      .subscribe(() => {
        const start_time = this.formGroup.get('start_time')?.value;
        const end_time = this.formGroup.get('end_time')?.value;
        this.isDateRight = !(start_time && end_time && start_time > end_time);
      });
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
          this.commService.success(() => this.router.navigate(['./../../'], {relativeTo: this.route}));
        },
        error => {
          console.log('学期更新失败', error);
          this.commService.error();
        });
  }
}
