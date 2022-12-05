import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {StudentService} from '../../../service/student.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Assert} from '@yunzhi/ng-mock-api';
import {CommonService} from '../../../service/common.service';
import {CommonValidator} from '../../../validator/common-validator';
import {HttpClient} from '@angular/common/http';
import {User} from '../../../entity/user';
import {Clazz} from '../../../entity/clazz';
import {Student} from '../../../entity/student';
import {ClazzService} from '../../../service/clazz.service';

@Component({
  selector: 'app-clazz-members-add',
  templateUrl: './clazz-members-add.component.html',
  styleUrls: ['./clazz-members-add.component.css']
})
export class ClazzMembersAddComponent implements OnInit {

  formGroup: FormGroup;

  clazz_id: number | undefined;
  private clazzName: any;

  constructor(private studentService: StudentService,
              private route: ActivatedRoute,
              private router: Router,
              private commonService: CommonService,
              private httpClient: HttpClient,
              private clazzService: ClazzService) {
    const commonValidator = new CommonValidator(httpClient);
    this.formGroup = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required, CommonValidator.nameMinLength, CommonValidator.nameMaxLength])),
      sex: new FormControl(0, Validators.compose([Validators.required, CommonValidator.sex])),
      sno: new FormControl('',
        Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20), CommonValidator.sno]),
        commonValidator.snoUnique())
    });
  }

  ngOnInit(): void {
    this.clazz_id = +this.route.snapshot.params.clazz_id;
    this.clazzService.getById(this.clazz_id)
      .subscribe(clazz => {
        this.clazzName = clazz.name;
      });
  }

  onSubmit(): void {
    Assert.isNumber(this.clazz_id, 'clazz_id类型错误');
    this.studentService.save({
      user: {
        name: this.formGroup.get('name')?.value,
        sex: this.formGroup.get('sex')?.value,
      } as User,
      sno: this.formGroup.get('sno')?.value,
      clazz: {
        id: this.clazz_id as number
      } as Clazz,
    } as Student)
      .subscribe(success => {
        console.log('添加成功', success);
        this.commonService.success(() => this.router.navigate(['../'], {relativeTo: this.route}));
      }, error => {
        console.log('添加失败', error);
        this.commonService.error();
      });
  }

}
