import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherIndexComponent } from './teacher-index.component';
import {MockApiTestingModule} from '../../../mock-api/mock-api-testing.module';
import {TeacherIndexModule} from './teacher-index.module';
import {RouterTestingModule} from '@angular/router/testing';

describe('TeacherIndexComponent', () => {
  let component: TeacherIndexComponent;
  let fixture: ComponentFixture<TeacherIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MockApiTestingModule,
        TeacherIndexModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
