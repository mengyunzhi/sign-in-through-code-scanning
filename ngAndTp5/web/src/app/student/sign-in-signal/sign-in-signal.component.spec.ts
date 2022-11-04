import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SignInSignalComponent} from './sign-in-signal.component';

describe('student -> singInSignal -> SignInSignalComponent', () => {
  let component: SignInSignalComponent;
  let fixture: ComponentFixture<SignInSignalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignInSignalComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInSignalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    fixture.autoDetectChanges();
  });
});
