import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-room-index',
  templateUrl: './room-index.component.html',
  styleUrls: ['./room-index.component.css']
})
export class RoomIndexComponent implements OnInit {

  rooms = [{
    id: 1,
    name: 'A101',
    capacity: '45',
  }, {
    id: 2,
    name: 'A102',
    capacity: '50'
  },{
    id: 3,
    name: 'B101',
    capacity: '55'
  }];

  constructor() { }

  ngOnInit(): void {
  }

}
