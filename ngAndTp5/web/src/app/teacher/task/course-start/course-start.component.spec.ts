import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseStartComponent } from './course-start.component';
import {CourseStartModule} from './course-start.module';
import {MockApiTestingModule} from '../../../mock-api/mock-api-testing.module';
import {RouterTestingModule} from '@angular/router/testing';

describe('CourseStartComponent', () => {
  let component: CourseStartComponent;
  let fixture: ComponentFixture<CourseStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CourseStartModule,
        MockApiTestingModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
