import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-add',
  templateUrl: './term-add.component.html',
  styleUrls: ['./term-add.component.css']
})
export class TermAddComponent implements OnInit {
  formGroup = new FormGroup({
    name : new FormControl('', Validators.required),
    startTime : new FormControl('', Validators.required),
    endTime : new FormControl('', Validators.required),
    state : new FormControl(0, Validators.required),
  });
  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get('http://localhost/thinkphp/public/index/login/test')
      .subscribe((data) => {
        console.log('请求成功', data);
      },
      error => console.log('请求失败', error));
  }
}
