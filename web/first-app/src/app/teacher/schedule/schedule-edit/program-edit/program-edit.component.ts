import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProgramService} from '../../../../service/program.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Assert} from '@yunzhi/ng-mock-api';
import {Notify, Report} from 'notiflix';
import {CommonService} from '../../../../service/common.service';

@Component({
  selector: 'app-program-edit',
  templateUrl: './program-edit.component.html',
  styleUrls: ['./program-edit.component.css']
})
export class ProgramEditComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private programService: ProgramService,
              private router: Router,
              private commService: CommonService) { }

  program_id: number | undefined;

  formGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    lesson: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.program_id = +this.route.snapshot.params.program_id;
    this.programService.getById(this.program_id)
      .subscribe(program => {
        console.log('program', program);
        this.program_id = program.id;
        this.formGroup.get('name')?.setValue(program.name);
        this.formGroup.get('lesson')?.setValue(program.lesson);
      }, error => {
        console.log('error', error);
      });
  }

  onSubmit(): void {
    Assert.isNumber(this.program_id, 'program_id的类型不是number');
    this.programService.update(this.program_id as number, this.formGroup.value)
      .subscribe(success => {
        console.log('项目更新成功', success);
        this.commService.success(() => this.router.navigate(['./../../'], {relativeTo: this.route}));
      }, error => {
        console.log('项目更新失败', error);
        this.commService.error();
      });
  }

}
