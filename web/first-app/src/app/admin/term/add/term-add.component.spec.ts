import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermAddComponent } from './term-add.component';
import {MockApiTestingModule} from '../../../mock-api/mock-api-testing.module';

describe('TermAddComponent', () => {
  let component: TermAddComponent;
  let fixture: ComponentFixture<TermAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermAddComponent ],
      imports: [
        MockApiTestingModule
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
