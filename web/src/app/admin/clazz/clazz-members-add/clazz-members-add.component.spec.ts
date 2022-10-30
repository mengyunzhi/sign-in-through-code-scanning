import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClazzMembersAddComponent } from './clazz-members-add.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';

describe('ClazzMembersAddComponent', () => {
  let component: ClazzMembersAddComponent;
  let fixture: ComponentFixture<ClazzMembersAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClazzMembersAddComponent ],
      imports: [
        HttpClientModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClazzMembersAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
