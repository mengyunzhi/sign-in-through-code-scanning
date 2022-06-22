import { Component, OnInit } from '@angular/core';
import {Clazz} from '../../../entity/clazz';

@Component({
  selector: 'app-clazz-index',
  templateUrl: './clazz-index.component.html',
  styleUrls: ['./clazz-index.component.css']
})
export class ClazzIndexComponent implements OnInit {
  clazzes= new Array<Clazz>();

  constructor() { }

  ngOnInit(): void {
    
  }

}
