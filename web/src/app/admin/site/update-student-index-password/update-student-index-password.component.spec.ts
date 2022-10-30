import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStudentIndexPasswordComponent } from './update-student-index-password.component';

describe('UpdateStudentIndexPasswordComponent', () => {
  let component: UpdateStudentIndexPasswordComponent;
  let fixture: ComponentFixture<UpdateStudentIndexPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateStudentIndexPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateStudentIndexPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
