import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProgramService} from '../../../../service/program.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Assert} from '@yunzhi/ng-mock-api';
import {Notify, Report} from 'notiflix';
import {CommonService} from '../../../../service/common.service';
import {CommonValidator} from '../../../../validator/common-validator';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-program-edit',
  templateUrl: './program-edit.component.html',
  styleUrls: ['./program-edit.component.css']
})
export class ProgramEditComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private route: ActivatedRoute,
              private programService: ProgramService,
              private router: Router,
              private commService: CommonService,
              private httpClient: HttpClient) {
    this.prograId = +this.route.snapshot.params.program_id;
    const commonValidator = new CommonValidator(httpClient);
    this.formGroup = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required, CommonValidator.nameMinLength, CommonValidator.nameMaxLength]),
        commonValidator.programNameUnique(this.prograId)),
      lesson: new FormControl(null, Validators.compose([Validators.required, Validators.min(1), CommonValidator.integer])),
    });
  }

  prograId: number | undefined;


  ngOnInit(): void {
    Assert.isNumber(this.prograId, 'program_id类型错误');
    this.programService.getById(this.prograId as number)
      .subscribe(program => {
        console.log('program', program);
        this.formGroup.get('name')?.setValue(program.name);
        this.formGroup.get('lesson')?.setValue(program.lesson);
      }, error => {
        console.log('error', error);
      });
  }

  onSubmit(): void {
    Assert.isNumber(this.prograId, 'program_id的类型不是number');
    this.programService.update(this.prograId as number, this.formGroup.value)
      .subscribe(success => {
        console.log('项目更新成功', success);
        this.commService.success(() => this.router.navigate(['./../../'], {relativeTo: this.route}));
      }, error => {
        console.log('项目更新失败', error);
        this.commService.error();
      });
  }

}
