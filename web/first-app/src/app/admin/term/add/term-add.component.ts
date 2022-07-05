import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {TermService} from '../../../service/term.service';
import {Term} from '../../../entity/term';
import {ActivatedRoute, Router} from '@angular/router';
import {Notify, Report} from 'notiflix';
@Component({
  selector: 'app-add',
  templateUrl: './term-add.component.html',
  styleUrls: ['./term-add.component.css']
})
export class TermAddComponent implements OnInit {
  formGroup = new FormGroup({
    name : new FormControl('', Validators.required),
    start_time : new FormControl(null, Validators.required),
    end_time : new FormControl(null, Validators.required),
    state : new FormControl(0, Validators.required),
  });
  constructor(private termService: TermService,
              private router: Router,
              private route: ActivatedRoute) { }

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
          this.router.navigate(['../'], {relativeTo: this.route});
          Notify.success('添加成功', {timeout: 1000});
        },
        error => {
          console.log('添加失败', error);
          Report.failure('添加失败', '', '确定');
        });
  }
}
