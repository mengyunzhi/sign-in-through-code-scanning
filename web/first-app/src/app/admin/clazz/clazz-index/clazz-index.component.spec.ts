import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClazzIndexComponent } from './clazz-index.component';

describe('ClazzIndexComponent', () => {
  let component: ClazzIndexComponent;
  let fixture: ComponentFixture<ClazzIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClazzIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClazzIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
