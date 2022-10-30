import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NameEditComponent } from './name-edit.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';

describe('NameEditComponent', () => {
  let component: NameEditComponent;
  let fixture: ComponentFixture<NameEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NameEditComponent ],
      imports: [
        HttpClientModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NameEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
