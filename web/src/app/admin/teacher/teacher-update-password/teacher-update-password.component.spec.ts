import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherUpdatePasswordComponent } from './teacher-update-password.component';
import {MockApiTestingModule} from '../../../mock-api/mock-api-testing.module';
import {RouterTestingModule} from '@angular/router/testing';

describe('TeacherUpdatePasswordComponent', () => {
  let component: TeacherUpdatePasswordComponent;
  let fixture: ComponentFixture<TeacherUpdatePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherUpdatePasswordComponent ],
      imports: [
        MockApiTestingModule,
        RouterTestingModule
      ]
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
