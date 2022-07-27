import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {StudentService} from '../../../service/student.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Assert} from '@yunzhi/ng-mock-api';
import {CommonService} from '../../../service/common.service';
import {CommonValidator} from '../../../validator/common-validator';

@Component({
  selector: 'app-clazz-members-add',
  templateUrl: './clazz-members-add.component.html',
  styleUrls: ['./clazz-members-add.component.css']
})
export class ClazzMembersAddComponent implements OnInit {

  formGroup: FormGroup = new FormGroup({
    name: new FormControl('', Validators.compose([Validators.required, CommonValidator.nameMinLength, CommonValidator.nameMaxLength])),
    sex: new FormControl(0, Validators.compose([Validators.required, CommonValidator.sex])),
    sno: new FormControl('',
      Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20), CommonValidator.sno]))
  });

  clazz_id: number | undefined;

  constructor(private studentService: StudentService,
              private route: ActivatedRoute,
              private router: Router,
              private commonService: CommonService) {
  }

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
        this.commonService.success(() => this.router.navigate(['../'], {relativeTo: this.route}));
      }, error => {
        console.log('添加失败', error);
        this.commonService.error();
      });
  }

}
