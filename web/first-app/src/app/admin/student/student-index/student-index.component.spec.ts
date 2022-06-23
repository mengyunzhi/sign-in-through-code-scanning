import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StudentIndexComponent} from './student-index.component';
import {FormsModule} from '@angular/forms';
import {getTestScheduler} from 'jasmine-marbles';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {PageModule} from '../../../page/page.module';
import {RouterTestingModule} from '@angular/router/testing';
import {MockApiTestingInterceptor} from '@yunzhi/ng-mock-api/testing';
import {TermMockApi} from '../../../mock-api/term.mock.api';
import {StudentMockApi} from '../../../mock-api/student.mock.api';

describe('StudentIndexComponent', () => {
  let component: StudentIndexComponent;
  let fixture: ComponentFixture<StudentIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentIndexComponent],
      imports: [
        HttpClientModule,
        PageModule,
        RouterTestingModule
      ],
      providers: [
        {
          provide: HTTP_INTERCEPTORS, multi: true,
          useClass: MockApiTestingInterceptor.forRoot([StudentMockApi]),
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
    getTestScheduler().flush();
    fixture.detectChanges();
    fixture.autoDetectChanges();
  });
});
