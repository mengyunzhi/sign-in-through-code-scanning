import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ScheduleService} from '../../../service/schedule.service';
import {CourseService} from '../../../service/course.service';
import {StudentService} from '../../../service/student.service';

@Component({
  selector: 'app-view-student-fraction',
  templateUrl: './view-student-fraction.component.html',
  styleUrls: ['./view-student-fraction.component.css']
})
export class ViewStudentFractionComponent implements OnInit {
  private schedule_id: number | undefined;
  private courseName: string | undefined;
  private student_id: number | undefined;
  private studentName: string | undefined;

  constructor(private route: ActivatedRoute,
              private scheduleService: ScheduleService,
              private courseService: CourseService,
              private studentService: StudentService) { }

  ngOnInit(): void {
    this.schedule_id = +this.route.snapshot.params.schedule_id;
    this.scheduleService.getById(this.schedule_id)
      .subscribe(schedule => {
        const courseId = schedule.course.id;
        this.courseService.getById(courseId)
          .subscribe(course => {
            this.courseName = course.name;
          });
      });
    this.student_id = +this.route.snapshot.params.student_id;
    this.studentService.getByStudentId(this.student_id)
      .subscribe(student => {
        this.studentName = student.user.name;
      });
  }

}
