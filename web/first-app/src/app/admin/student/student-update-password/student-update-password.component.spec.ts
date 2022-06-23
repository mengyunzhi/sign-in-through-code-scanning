import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentUpdatePasswordComponent } from './student-update-password.component';

describe('StudentUpdatePasswordComponent', () => {
  let component: StudentUpdatePasswordComponent;
  let fixture: ComponentFixture<StudentUpdatePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentUpdatePasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentUpdatePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
