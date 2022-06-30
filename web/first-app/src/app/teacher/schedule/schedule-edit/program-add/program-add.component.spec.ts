import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramAddComponent } from './program-add.component';

describe('ProgramAddComponent', () => {
  let component: ProgramAddComponent;
  let fixture: ComponentFixture<ProgramAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
