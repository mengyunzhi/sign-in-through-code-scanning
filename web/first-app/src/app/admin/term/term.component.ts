import { Component, OnInit } from '@angular/core';
import {Term} from '../../entity/term';

@Component({
  selector: 'app-term',
  templateUrl: './term.component.html',
  styleUrls: ['./term.component.css']
})
export class TermComponent implements OnInit {
  terms = new Array<Term>(
    {
      id: 1,
      state: true,
      name: '春季学期',
      startTime: 1123123,
      endTime: 4222222
    },
    {
      id: 2,
      state: false,
      name: '秋季学期',
      startTime: 1112333,
      endTime: 1242424
    }
  );

  constructor() { }

  ngOnInit(): void {
  }

}
