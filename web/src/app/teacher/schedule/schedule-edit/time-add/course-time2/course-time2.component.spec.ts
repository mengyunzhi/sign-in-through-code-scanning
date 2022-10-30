import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseTime2Component } from './course-time2.component';

describe('CourseTime2Component', () => {
  let component: CourseTime2Component;
  let fixture: ComponentFixture<CourseTime2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseTime2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseTime2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
