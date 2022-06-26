import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SignInIndexComponent} from './sign-in-index.component';

describe('SignInIndexComponent', () => {
  let component: SignInIndexComponent;
  let fixture: ComponentFixture<SignInIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignInIndexComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    fixture.autoDetectChanges();
  });
});
