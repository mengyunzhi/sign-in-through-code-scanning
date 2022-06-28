import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-index',
  templateUrl: './course-index.component.html',
  styleUrls: ['./course-index.component.css']
})
export class CourseIndexComponent implements OnInit {
  // 定义教师数组
  courses = [{
    id: 1,
    name: '高数',
    lesson: 48,
  }, {
    id: 2,
    name: '大物',
    lesson: '36',
  }];

  constructor() { }

  ngOnInit(): void {
  }

}
