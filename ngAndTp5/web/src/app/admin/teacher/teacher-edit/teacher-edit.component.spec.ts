import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherEditComponent } from './teacher-edit.component';
import {MockApiTestingModule} from '../../../mock-api/mock-api-testing.module';
import {RouterTestingModule} from '@angular/router/testing';

describe('TeacherEditComponent', () => {
  let component: TeacherEditComponent;
  let fixture: ComponentFixture<TeacherEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherEditComponent ],
      imports: [
        MockApiTestingModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
