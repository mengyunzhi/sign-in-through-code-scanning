import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStudentAddComponent } from './view-student-add.component';

describe('ViewStudentAddComponent', () => {
  let component: ViewStudentAddComponent;
  let fixture: ComponentFixture<ViewStudentAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewStudentAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewStudentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
