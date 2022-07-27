import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TermService} from '../../../service/term.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '../../../service/common.service';
import {CommonValidator} from '../../../validator/common-validator';

@Component({
  selector: 'app-add',
  templateUrl: './term-add.component.html',
  styleUrls: ['./term-add.component.css']
})
export class TermAddComponent implements OnInit {
  formGroup = new FormGroup({
    name: new FormControl('', Validators.compose([Validators.required, CommonValidator.nameMinLength, CommonValidator.nameMaxLength])),
    start_time: new FormControl(null, Validators.required),
    end_time: new FormControl(null, Validators.required),
    state: new FormControl(0, Validators.required),
  });

  constructor(private termService: TermService,
              private router: Router,
              private route: ActivatedRoute,
              private commonService: CommonService) {
  }

  ngOnInit(): void {
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
