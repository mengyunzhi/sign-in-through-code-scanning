import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClazzIndexComponent } from './clazz-index.component';
import {MockApiTestingModule} from '../../../mock-api/mock-api-testing.module';
import {RouterTestingModule} from '@angular/router/testing';

describe('ClazzIndexComponent', () => {
  let component: ClazzIndexComponent;
  let fixture: ComponentFixture<ClazzIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClazzIndexComponent ],
      imports: [
        MockApiTestingModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClazzIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
