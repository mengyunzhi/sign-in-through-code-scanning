import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TermService} from '../../../service/term.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '../../../service/common.service';
import {CommonValidator} from '../../../validator/common-validator';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-add',
  templateUrl: './term-add.component.html',
  styleUrls: ['./term-add.component.css']
})
export class TermAddComponent implements OnInit {
  formGroup: FormGroup;

  constructor(private termService: TermService,
              private router: Router,
              private route: ActivatedRoute,
              private httpClient: HttpClient,
              private commonService: CommonService) {
    const commonValidator = new CommonValidator(httpClient);
    this.formGroup = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required, CommonValidator.nameMinLength, CommonValidator.nameMaxLength]),
        commonValidator.termNameUnique()),
      start_time: new FormControl(null, Validators.required),
      end_time: new FormControl(null, Validators.required),
      state: new FormControl(0, Validators.required),
    });
  }

  isDateRight = true;

  ngOnInit(): void {
    this.formGroup.get('end_time')?.valueChanges
      .subscribe(() => {
        const start_time = this.formGroup.get('start_time')?.value;
        const end_time = this.formGroup.get('end_time')?.value;
        this.isDateRight = !(start_time && end_time && start_time > end_time);
      });
  }

  onSubmit(): void {
    const term = this.formGroup.value as {
      name: string,
      start_time: string,
      end_time: string,
      state: number
    };
    this.termService.add(term)
      .subscribe(success => {
          console.log('添加成功', success);
          this.commonService.success(() => this.router.navigate(['../'], {relativeTo: this.route}));
        },
        error => {
          console.log('添加失败', error);
          this.commonService.error();
        });
  }
}
