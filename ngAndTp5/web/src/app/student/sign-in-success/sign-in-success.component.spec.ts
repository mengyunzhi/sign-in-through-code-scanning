import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SignInSuccessComponent} from './sign-in-success.component';

describe('student -> signInSuccess -> SignInSuccessComponent', () => {
  let component: SignInSuccessComponent;
  let fixture: ComponentFixture<SignInSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignInSuccessComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    fixture.autoDetectChanges();
  });
});
