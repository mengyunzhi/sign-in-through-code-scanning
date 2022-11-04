import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermAddComponent } from './term-add.component';
import {MockApiTestingModule} from '../../../mock-api/mock-api-testing.module';
import {RouterTestingModule} from '@angular/router/testing';

describe('TermAddComponent', () => {
  let component: TermAddComponent;
  let fixture: ComponentFixture<TermAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermAddComponent ],
      imports: [
        MockApiTestingModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
