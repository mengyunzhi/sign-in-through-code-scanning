import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-schedule-add',
  templateUrl: './schedule-add.component.html',
  styleUrls: ['./schedule-add.component.css']
})
export class ScheduleAddComponent implements OnInit {

  $day = [1, 2, 3, 4, 5, 6, 7];

  constructor() { }

  ngOnInit(): void {
  }

}
