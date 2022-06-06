import { Component, OnInit } from '@angular/core';
import {Student} from '../../../entity/student';

@Component({
  selector: 'app-student-index',
  templateUrl: './student-index.component.html',
  styleUrls: ['./student-index.component.css']
})
export class StudentIndexComponent implements OnInit {
  students = new Array<Student>();

  constructor() { }

  ngOnInit(): void {
  }

}
