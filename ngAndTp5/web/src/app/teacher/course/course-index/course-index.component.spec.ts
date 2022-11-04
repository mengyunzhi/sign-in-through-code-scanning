import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseIndexComponent } from './course-index.component';
import {MockApiTestingModule} from '../../../mock-api/mock-api-testing.module';

describe('teacher => course => CourseIndexComponent', () => {
  let component: CourseIndexComponent;
  let fixture: ComponentFixture<CourseIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseIndexComponent ],
      imports: [
        MockApiTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
