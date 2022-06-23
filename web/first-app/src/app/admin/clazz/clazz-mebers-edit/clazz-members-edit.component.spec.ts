import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClazzMembersEditComponent } from './clazz-mebers-edit.component';

describe('ClazzMebersEditComponent', () => {
  let component: ClazzMembersEditComponent;
  let fixture: ComponentFixture<ClazzMembersEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClazzMembersEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClazzMembersEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
