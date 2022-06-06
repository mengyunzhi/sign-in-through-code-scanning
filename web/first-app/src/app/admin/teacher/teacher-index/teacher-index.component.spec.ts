import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherIndexComponent } from './teacher-index.component';

describe('TeacherIndexComponent', () => {
  let component: TeacherIndexComponent;
  let fixture: ComponentFixture<TeacherIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherIndexComponent ]
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
