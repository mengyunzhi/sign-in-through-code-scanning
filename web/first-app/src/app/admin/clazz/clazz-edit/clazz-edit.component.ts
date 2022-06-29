import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Clazz} from '../../../entity/clazz';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-clazz-edit',
  templateUrl: './clazz-edit.component.html',
  styleUrls: ['./clazz-edit.component.css']
})
export class ClazzEditComponent implements OnInit {
  formGroup = new FormGroup({
    name: new FormControl(''),
    entrance_date: new FormControl(null),
    length: new FormControl(null)
  });

  constructor(private httpClient: HttpClient,
              private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.httpClient.get<Clazz>('/clazz/1')
      .subscribe(clazz => {
        this.formGroup.get('name')?.setValue(clazz.name);
        this.formGroup.get('entrance_date')?.setValue(this.datePipe.transform(new Date(clazz.entrance_date * 1000), 'yyyy-MM-dd'));
        this.formGroup.get('length')?.setValue(clazz.length);
      });
  }

}
