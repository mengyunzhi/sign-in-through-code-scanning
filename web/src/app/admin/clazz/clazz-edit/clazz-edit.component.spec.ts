import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClazzEditComponent } from './clazz-edit.component';
import {HttpClientModule} from '@angular/common/http';
import {DatePipe} from '@angular/common';
import {MockApiTestingModule} from '../../../mock-api/mock-api-testing.module';
import {RouterTestingModule} from '@angular/router/testing';

describe('admin => clazz => ClazzEditComponent', () => {
  let component: ClazzEditComponent;
  let fixture: ComponentFixture<ClazzEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClazzEditComponent ],
      imports: [
        HttpClientModule,
        MockApiTestingModule,
        RouterTestingModule
      ],
      providers: [
        DatePipe
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClazzEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
