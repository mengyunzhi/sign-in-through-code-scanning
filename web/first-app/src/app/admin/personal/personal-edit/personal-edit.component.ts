import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-personal-edit',
  templateUrl: './personal-edit.component.html',
  styleUrls: ['./personal-edit.component.css']
})
export class PersonalEditComponent implements OnInit {

  formGroup: FormGroup = new FormGroup({
    password: new FormControl(null),
    name: new FormControl('用户'),
    sex: new FormControl(),
    role: new FormControl(),
    number: new FormControl()
  });

  constructor() { }

  ngOnInit(): void {
    this.formGroup.get('sex')?.setValue(Number((Math.random() * 10).toFixed()) % 2);
    this.formGroup.get('role')?.setValue(+(window.sessionStorage.getItem('role') as string));
    this.formGroup.get('number')?.setValue(Number((Math.random() * 100 * 10000 * 10000 + 10000000000).toFixed()).toString());
  }

}
