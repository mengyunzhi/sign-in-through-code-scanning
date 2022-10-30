import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentUpdatePasswordComponent } from './student-update-password.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';

describe('StudentUpdatePasswordComponent', () => {
  let component: StudentUpdatePasswordComponent;
  let fixture: ComponentFixture<StudentUpdatePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentUpdatePasswordComponent ],
      imports: [
        HttpClientModule,
        RouterTestingModule
      ]
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
