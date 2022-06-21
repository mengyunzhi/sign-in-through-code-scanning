import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Term} from '../../../entity/term';

@Component({
  selector: 'app-term-edit',
  templateUrl: './term-edit.component.html',
  styleUrls: ['./term-edit.component.css']
})
export class TermEditComponent implements OnInit {

  formGroup : FormGroup;
  id : number | undefined;

  constructor(private activatedRoute: ActivatedRoute,
              private httpClient: HttpClient) {
    this.formGroup = new FormGroup({
      name : new FormControl('', Validators.required),
      startTime : new FormControl('', Validators.required),
      endTime : new FormControl('', Validators.required),
      state : new FormControl(0, Validators.required),
    })
    this.id = this.activatedRoute.snapshot.params.id;
    console.log(this.id);
    this.loadData(this.id);
  }

  ngOnInit(): void {
  }

  loadData(id: number | undefined) : void {
    console.log('loadData is called');
    this.httpClient.get<Term>('/term/' + id)
      .subscribe(term => {
        const start = new Date(term.startTime * 1000);
        const end = new Date(term.endTime * 1000);
        this.formGroup.get('name')?.setValue(term.name);
        this.formGroup.get('state')?.setValue(term.state);
        this.formGroup.get('startTime')?.setValue('2022-03-01');
        this.formGroup.get('endTime')?.setValue('2022-05-31');
        console.log(this.formGroup.value);
      })
  }
}
