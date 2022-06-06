import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherUpdatePasswordComponent } from './teacher-update-password.component';

describe('TeacherUpdatePasswordComponent', () => {
  let component: TeacherUpdatePasswordComponent;
  let fixture: ComponentFixture<TeacherUpdatePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherUpdatePasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherUpdatePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
