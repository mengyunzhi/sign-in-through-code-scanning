import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeAddComponent } from './time-add.component';

describe('TimeAddComponent', () => {
  let component: TimeAddComponent;
  let fixture: ComponentFixture<TimeAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
