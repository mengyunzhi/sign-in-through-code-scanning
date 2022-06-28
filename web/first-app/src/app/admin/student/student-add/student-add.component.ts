import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css']
})
export class StudentAddComponent implements OnInit {
  /**
   * 初始化表单组
   */
  formGroup = new FormGroup({});

  /**
   * 表单关键字
   */
  formKeys = {clazzId: 'clazzId'};

  constructor() {
  }

  ngOnInit(): void {
    // 添加表单控制器，控制V层clazzId
    this.formGroup.addControl(this.formKeys.clazzId, new FormControl(null, Validators.required));
  }

  // onClazzChange(clazzId: number): void {
  //   this.clazzId = clazzId;
  // }
}
