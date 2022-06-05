import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermIndexComponent } from './term-index.component';
import {TermMockApi} from '../../../mock-api/term.mock.api';
import {MockApiTestingInterceptor} from '@yunzhi/ng-mock-api/testing';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {getTestScheduler} from 'jasmine-marbles';
import {TermStatePipe} from '../../pipe/term-state.pipe';

fdescribe('TermIndexComponent', () => {
  let component: TermIndexComponent;
  let fixture: ComponentFixture<TermIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermIndexComponent, TermStatePipe ],
      imports: [HttpClientModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS, multi: true,
          useClass: MockApiTestingInterceptor.forRoot([TermMockApi]),
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    getTestScheduler().flush();
    fixture.autoDetectChanges();
  });
});
