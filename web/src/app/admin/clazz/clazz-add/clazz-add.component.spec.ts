import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClazzAddComponent } from './clazz-add.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';

describe('ClazzAddComponent', () => {
  let component: ClazzAddComponent;
  let fixture: ComponentFixture<ClazzAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClazzAddComponent ],
      imports: [
        HttpClientModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClazzAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
