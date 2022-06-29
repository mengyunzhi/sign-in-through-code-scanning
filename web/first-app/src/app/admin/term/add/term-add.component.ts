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
    start_time : new FormControl(null, Validators.required),
    end_time : new FormControl(null, Validators.required),
    state : new FormControl(0, Validators.required),
  });
  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }
}
