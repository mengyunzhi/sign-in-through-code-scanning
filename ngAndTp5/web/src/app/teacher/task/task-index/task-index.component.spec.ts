import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskIndexComponent } from './task-index.component';
import {MockApiTestingModule} from '../../../mock-api/mock-api-testing.module';
import {RouterTestingModule} from '@angular/router/testing';
import {TaskIndexModule} from './task-index.module';

describe('TaskIndexComponent', () => {
  let component: TaskIndexComponent;
  let fixture: ComponentFixture<TaskIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TaskIndexModule,
        MockApiTestingModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
