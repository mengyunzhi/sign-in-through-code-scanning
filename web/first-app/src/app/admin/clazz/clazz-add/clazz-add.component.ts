import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-clazz-add',
  templateUrl: './clazz-add.component.html',
  styleUrls: ['./clazz-add.component.css']
})
export class ClazzAddComponent implements OnInit {
  formGroup = new FormGroup({
    name: new FormControl(''),
    entrance_date: new FormControl(null),
    length: new FormControl(null)
  });

  constructor() { }

  ngOnInit(): void {
  }

}
