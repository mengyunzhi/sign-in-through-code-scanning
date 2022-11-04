import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClazzMembersEditComponent } from './clazz-mebers-edit.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';

describe('ClazzMebersEditComponent', () => {
  let component: ClazzMembersEditComponent;
  let fixture: ComponentFixture<ClazzMembersEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClazzMembersEditComponent ],
      imports: [
        HttpClientModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClazzMembersEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
