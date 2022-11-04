import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-start',
  templateUrl: './course-start.component.html',
  styleUrls: ['./course-start.component.css']
})
export class CourseStartComponent implements OnInit {
  randomCode: number | null = null;
  coursing = false;


  constructor() { }

  ngOnInit(): void {
    const coursing = window.sessionStorage.getItem('coursing');
    if (coursing !== null) {
      this.coursing = true;
    }
  }

  setRandomCode(): void {
    const num = Math.random() * 1000000;
    this.randomCode = Number((num > 100000 ? num : num + 100000).toFixed(0));
  }

  courseStart(): void {
    this.coursing = true;
    window.sessionStorage.setItem('coursing', 'true');
  }

  courseEnd(): void {
    window.sessionStorage.removeItem('coursing');
    this.coursing = false;
  }

}
