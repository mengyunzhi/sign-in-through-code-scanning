import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProgramService} from '../../../../service/program.service';
import {ScheduleService} from '../../../../service/schedule.service';

@Component({
  selector: 'app-program-add',
  templateUrl: './program-add.component.html',
  styleUrls: ['./program-add.component.css']
})
export class ProgramAddComponent implements OnInit {
  formGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    lesson: new FormControl(null, Validators.required),
  });

  constructor(private programService: ProgramService) { }

  ngOnInit(): void {
  }
  onSubmit(): void {
    this.programService.add({
      name: this.formGroup.get('name')?.value,
      lesson: this.formGroup.get('lesson')?.value,
      course_id: 1,
    });
  }

}
