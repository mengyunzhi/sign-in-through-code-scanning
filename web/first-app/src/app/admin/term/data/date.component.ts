import {Component, forwardRef, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => DateComponent)
    }
  ]
})
export class DateComponent implements OnInit, ControlValueAccessor {

  date = new FormControl();

  constructor() { }

  registerOnTouched(fn: any): void {
    // throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
  }

  registerOnChange(fn: any): void {
    console.log('data组件向外传值');
    this.date.valueChanges
      .subscribe(date => {
        console.log(date);
        date = new Date(date).getTime() / 1000;
        fn(date);
      });
  }

  writeValue(data: string): void {
    console.log('向data组件传值', data);
    this.date.setValue(data);
  }
}
