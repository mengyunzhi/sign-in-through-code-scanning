import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClazzMembersAddComponent } from './clazz-members-add.component';

describe('ClazzMembersAddComponent', () => {
  let component: ClazzMembersAddComponent;
  let fixture: ComponentFixture<ClazzMembersAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClazzMembersAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClazzMembersAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
