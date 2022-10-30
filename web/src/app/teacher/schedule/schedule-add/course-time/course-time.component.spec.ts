import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseTimeComponent } from './course-time.component';

describe('CourseTimeComponent', () => {
  let component: CourseTimeComponent;
  let fixture: ComponentFixture<CourseTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
