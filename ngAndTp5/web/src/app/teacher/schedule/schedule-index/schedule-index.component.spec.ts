import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleIndexComponent } from './schedule-index.component';
import {MockApiTestingModule} from '../../../mock-api/mock-api-testing.module';

describe('teacher => schedule => ScheduleIndexComponent', () => {
  let component: ScheduleIndexComponent;
  let fixture: ComponentFixture<ScheduleIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleIndexComponent ],
      imports: [
        MockApiTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
