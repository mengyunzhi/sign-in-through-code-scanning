import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-in-state',
  templateUrl: './sign-in-state.component.html',
  styleUrls: ['./sign-in-state.component.css']
})
export class SignInStateComponent implements OnInit {
  isSeat = true;

  constructor() { }

  ngOnInit(): void {
  }

  signInShift(): void {
    this.isSeat = !this.isSeat;
  }

}
