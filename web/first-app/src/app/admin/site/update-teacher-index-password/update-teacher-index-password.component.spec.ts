import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTeacherIndexPasswordComponent } from './update-teacher-index-password.component';

describe('UpdateTeacherIndexPasswordComponent', () => {
  let component: UpdateTeacherIndexPasswordComponent;
  let fixture: ComponentFixture<UpdateTeacherIndexPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateTeacherIndexPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTeacherIndexPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
