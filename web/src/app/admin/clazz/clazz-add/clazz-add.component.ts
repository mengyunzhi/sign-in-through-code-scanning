import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ClazzService} from '../../../service/clazz.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '../../../service/common.service';
import {CommonValidator} from '../../../validator/common-validator';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-clazz-add',
  templateUrl: './clazz-add.component.html',
  styleUrls: ['./clazz-add.component.css']
})
export class ClazzAddComponent implements OnInit {
  formGroup: FormGroup;

  constructor(private clazzService: ClazzService,
              private router: Router,
              private route: ActivatedRoute,
              private commonService: CommonService,
              private httpClient: HttpClient) {
    const commonValidator = new CommonValidator(httpClient);
    this.formGroup = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required, CommonValidator.nameMinLength, CommonValidator.nameMaxLength]),
        commonValidator.clazzNameUnique()),
      entrance_date: new FormControl(null, Validators.required),
      length: new FormControl(null,
        Validators.compose([Validators.required, Validators.max(10), Validators.min(1), CommonValidator.integer]))
    });
  }

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
        this.commonService.success(() => this.router.navigate(['../'], {relativeTo: this.route}));
      }, error => {
        console.log('班级添加失败', error);
        this.commonService.error();
      });
  }
}
