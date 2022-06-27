import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ClazzSelectComponent} from './clazz-select.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MockApiTestingModule} from '../../../mock-api/mock-api-testing.module';
import {getTestScheduler} from 'jasmine-marbles';
import {By} from '@angular/platform-browser';

describe('admin -> clazz -> ClazzSelectComponent', () => {
  let component: ClazzSelectComponent;
  let fixture: ComponentFixture<ClazzSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClazzSelectComponent],
      imports: [
        HttpClientModule,
        FormsModule,
        MockApiTestingModule,
        ReactiveFormsModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClazzSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    fixture.autoDetectChanges();
    component.beChange
      .subscribe((data: number) => console.log('接收弹出数据：', data));
  });
});
