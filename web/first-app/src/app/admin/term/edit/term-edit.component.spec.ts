import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermEditComponent } from './term-edit.component';
import {RouterTestingModule} from '@angular/router/testing';
import {MockApiTestingModule} from '../../../mock-api/mock-api-testing.module';
import {DatePipe} from '@angular/common';

describe('TermEditComponent', () => {
  let component: TermEditComponent;
  let fixture: ComponentFixture<TermEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermEditComponent ],
      imports: [
        RouterTestingModule,
        MockApiTestingModule,
      ],
      providers: [
        DatePipe
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
