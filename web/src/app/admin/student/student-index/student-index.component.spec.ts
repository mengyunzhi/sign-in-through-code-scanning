import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StudentIndexComponent} from './student-index.component';
import {getTestScheduler} from 'jasmine-marbles';
import {RouterTestingModule} from '@angular/router/testing';
import {MockApiTestingModule} from '../../../mock-api/mock-api-testing.module';
import {StudentIndexModule} from './student-index.module';

describe('admin -> student -> StudentIndexComponent', () => {
  let component: StudentIndexComponent;
  let fixture: ComponentFixture<StudentIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StudentIndexModule,
        MockApiTestingModule,
        RouterTestingModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    getTestScheduler().flush();
    fixture.detectChanges();
    fixture.autoDetectChanges();
  });
});
