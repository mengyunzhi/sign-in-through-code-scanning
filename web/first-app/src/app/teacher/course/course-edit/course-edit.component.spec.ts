import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseEditComponent } from './course-edit.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {DatePipe} from '@angular/common';

describe('CourseEditComponent', () => {
  let component: CourseEditComponent;
  let fixture: ComponentFixture<CourseEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseEditComponent ],
      imports: [
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [
        DatePipe
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
