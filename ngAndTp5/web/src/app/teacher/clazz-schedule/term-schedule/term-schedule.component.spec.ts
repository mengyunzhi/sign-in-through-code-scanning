import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermScheduleComponent } from './term-schedule.component';

describe('TermScheduleComponent', () => {
  let component: TermScheduleComponent;
  let fixture: ComponentFixture<TermScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    fixture.autoDetectChanges();
  });
});
