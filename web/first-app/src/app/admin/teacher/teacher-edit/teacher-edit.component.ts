import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teacher-edit',
  templateUrl: './teacher-edit.component.html',
  styleUrls: ['./teacher-edit.component.css']
})
export class TeacherEditComponent implements OnInit {

  currentTeacher = [{
    name: '张三',
    sex: true,
    number: '111'
  }];

  constructor() { }

  ngOnInit(): void {
  }

}
