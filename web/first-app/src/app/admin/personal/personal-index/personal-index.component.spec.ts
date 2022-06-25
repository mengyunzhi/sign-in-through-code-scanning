import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalIndexComponent } from './personal-index.component';

describe('admin -> person -> PersonalIndexComponent', () => {
  let component: PersonalIndexComponent;
  let fixture: ComponentFixture<PersonalIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    fixture.autoDetectChanges();
  });
});
