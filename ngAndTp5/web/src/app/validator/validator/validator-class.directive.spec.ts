import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidatorClassDirective } from './validator-class.directive';

describe('ValidatorClassComponent', () => {
  let component: ValidatorClassDirective;
  let fixture: ComponentFixture<ValidatorClassDirective>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidatorClassDirective ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidatorClassDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
