import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClazzMembersComponent } from './clazz-members.component';

describe('ClazzMembersComponent', () => {
  let component: ClazzMembersComponent;
  let fixture: ComponentFixture<ClazzMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClazzMembersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClazzMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
