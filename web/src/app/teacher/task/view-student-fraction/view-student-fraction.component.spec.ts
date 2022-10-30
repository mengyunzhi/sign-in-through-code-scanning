import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStudentFractionComponent } from './view-student-fraction.component';

describe('ViewStudentFractionComponent', () => {
  let component: ViewStudentFractionComponent;
  let fixture: ComponentFixture<ViewStudentFractionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewStudentFractionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewStudentFractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
