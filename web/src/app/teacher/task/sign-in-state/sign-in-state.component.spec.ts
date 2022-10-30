import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInStateComponent } from './sign-in-state.component';

describe('SignInStateComponent', () => {
  let component: SignInStateComponent;
  let fixture: ComponentFixture<SignInStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignInStateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
