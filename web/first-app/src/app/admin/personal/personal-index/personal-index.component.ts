import { Component, OnInit } from '@angular/core';
import {User} from '../../../entity/user';

@Component({
  selector: 'app-personal-index',
  templateUrl: './personal-index.component.html',
  styleUrls: ['./personal-index.component.css']
})
export class PersonalIndexComponent implements OnInit {
  user = {
    id: 1,
    password: '123123',
    name: '用户',
  }　as User;

  constructor() { }

  ngOnInit(): void {
    this.user.sex = Number((Math.random() * 10).toFixed()) % 2;
    this.user.role = +(window.sessionStorage.getItem('role') as string);
    this.user.number = Number((Math.random() * 100 * 10000 * 10000 + 10000000000).toFixed()).toString();
  }

}
