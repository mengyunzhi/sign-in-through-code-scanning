import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SignInAffirmComponent} from './sign-in-affirm.component';

describe('student -> signInAffirm -> SignInAffirmComponent', () => {
  let component: SignInAffirmComponent;
  let fixture: ComponentFixture<SignInAffirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignInAffirmComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInAffirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    fixture.autoDetectChanges();
  });
});
