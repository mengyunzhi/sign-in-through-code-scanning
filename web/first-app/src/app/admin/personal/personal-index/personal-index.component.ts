import { Component, OnInit } from '@angular/core';
import {User} from '../../../entity/user';
import {UserService} from '../../../service/user.service';

@Component({
  selector: 'app-personal-index',
  templateUrl: './personal-index.component.html',
  styleUrls: ['./personal-index.component.css']
})
export class PersonalIndexComponent implements OnInit {
  user = {}　as User;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getCurrentLoginUser()
      .subscribe(user => {
        console.log('当前用户请求成功', user);
        this.user = user;
      }, error => {
        console.log('当前用户请求失败', error);
      });
  }

}
