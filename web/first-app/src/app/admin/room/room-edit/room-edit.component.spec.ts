import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomEditComponent } from './room-edit.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {PipeModule} from '../../../pipe/pipe.module';
import {DatePipe} from '@angular/common';

describe('RoomEditComponent', () => {
  let component: RoomEditComponent;
  let fixture: ComponentFixture<RoomEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomEditComponent ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
      ],
      providers: [
        DatePipe
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
